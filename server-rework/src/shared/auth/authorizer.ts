import * as Express from 'express';
import { Permission } from './permission.enum';
import { verify, sign, VerifyErrors } from 'jsonwebtoken';
import { UnauthorizedError } from './error/auth.errors';

export const JWTCookieName = 'access-token';
export const JWTCookieMaxAge = 1000 * 60 * 60 * 24 * 14; // 14 days

export function hasPermissions(...permissionsArg: Permission[]): Express.RequestHandler {
    const permissions = permissionsArg || [];

    return async (req, res, next) => {
        const token: string = req.cookies[JWTCookieName];

        // If token doesn't exist, go to next handler only if is permitted
        if (!token) {
            return next();
        }

        const [tokenPayload, error] = await decodeToken<JWTToken>(token);

        // If token has been altered, clear cookie and exit
        if (error) {
            res.clearCookie(JWTCookieName);
            throw new UnauthorizedError('Could not decode token.');
        }

        // Update cookie if older than half of lifespan
        if (new Date().getTime() - tokenPayload.expires < JWTCookieMaxAge / 2) {
            res.clearCookie(JWTCookieName);
            const newToken = await createToken({
                email: tokenPayload.email,
                expires: new Date().getTime() + JWTCookieMaxAge
            });
            res.cookie(JWTCookieName, newToken, {
                maxAge: JWTCookieMaxAge,
                httpOnly: true,
                secure: true
            });
        }

        const repository = await getRepository(User);
        const user = await repository.findOne({ where: { email: tokenPayload.email } });

        if (!user) {
            res.clearCookie(JWTCookieName);
            throw new UnauthorizedError(`User '${tokenPayload.email}' could not be found.`);
        }

        res.locals = {
            user
        };

        next();
    };
}

export function decodeToken<T>(token: string): Promise<[T, VerifyErrors]> {
    return new Promise(resolve => {
        verify(token, env.jwt.secret, (err, decoded) =>
            err ? resolve([null, err]) : resolve([(decoded as unknown) as T, null])
        );
    });
}
