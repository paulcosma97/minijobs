import { verify, sign, VerifyErrors } from 'jsonwebtoken';
import { RequestHandler, Response } from 'express';
import { getRepository } from 'typeorm';
import { User, defaultPermissionMask } from '../models/user.model';
import { handleError, UnauthorizedError, ForbiddenError } from '../utils/error-handler';
import env from '../configs/env';
import { UserPermissionMask, hasPermissions, computeAdminPermissionMask } from '../utils/permissions';
import axios from "axios";
import FacebookProfile from '../dtos/facebook-profile.dto';
import { uploadFile } from './file.service';

export enum AuthenticatedState {
    AUTHENTICATED,
    ANONYMOUS,
    ANY
}

class OnlyAllowRequestHandlerArgs {
    authenticated?: AuthenticatedState;
    permissions?: UserPermissionMask[];
}

type OnlyAllowRequestHandler = (args: OnlyAllowRequestHandlerArgs) => RequestHandler;

export interface JWTToken {
    email: string;
    expires: number;
}

export const JWTCookieName = 'access-token';
export const JWTCookieMaxAge = 1000 * 60 * 60 * 24 * 14; // 14 days

export const resolveContext = () => {
    return (req, res, next) => (async () => {

        const token: string = req.cookies[JWTCookieName];

        // If token doesn't exist, go to next handler only if is permitted
        if (!token) {
            return next();
        }

        const [ tokenPayload, error ] = await decodeToken<JWTToken>(token);

        // If token has been altered, clear cookie and exit
        if (error) {
            res.clearCookie(JWTCookieName);
            throw new UnauthorizedError('Could not decode token.');
        }

        // Update cookie if older than half of lifespan
        if (new Date().getTime() - tokenPayload.expires < JWTCookieMaxAge / 2) {
            res.clearCookie(JWTCookieName);
            const newToken = await createToken({ email: tokenPayload.email, expires: new Date().getTime() + JWTCookieMaxAge });
            res.cookie(JWTCookieName, newToken, { maxAge: JWTCookieMaxAge });
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
    })().catch(handleError(res));
}

/**
 * Middleware function to restrict access.
 * 
 * Defaults to allow any auth state and role USER
 */
export const restrictAccess: OnlyAllowRequestHandler = (args: OnlyAllowRequestHandlerArgs) => {
    args.authenticated = args.authenticated === undefined ? AuthenticatedState.ANY : args.authenticated;
    args.permissions = !args.permissions ? [] : args.permissions;

    return (_, res, next) => (async () => {
        const user = res.locals.user

        if (args.authenticated === AuthenticatedState.ANONYMOUS) {
            if (user) {
                throw new ForbiddenError();
            }
        }

        if (args.authenticated === AuthenticatedState.AUTHENTICATED) {
            if (!user) {
                throw new UnauthorizedError();
            }
        }

        if (!hasPermissions(user, args.permissions)) {
            throw new ForbiddenError();
        }

        next();
    })().catch(handleError(res));
}

export function decodeToken<T>(token: string): Promise<[T, VerifyErrors]> {
    return new Promise(resolve => {
        verify(token, env.jwt.secret, (err, decoded) => err ? resolve([null, err]) : resolve([decoded as unknown as T, null]));
    });
}

export function createToken(token: JWTToken): Promise<string> {
    return new Promise((resolve, reject) => sign(token, env.jwt.secret, (err, token: string) => err ? reject(err) : resolve(token)));
}

export async function authenticate(accessToken: string, response: Response): Promise<User> {
    const profile = await getFacebookProfile(accessToken);
    const user = await createOrUpdateUser(profile);
    await setAuthCookie(user, response);
    return user;
} 

function getFacebookProfile(accessToken: string): Promise<FacebookProfile> {
    return axios
    .get<FacebookProfile>(
      "https://graph.facebook.com/v4.0/me?fields=name,first_name,last_name,picture,email&access_token=" +
        accessToken
    )
    .then(res => res.data)
}

async function createOrUpdateUser(profile: FacebookProfile): Promise<User> {
    const repository = await getRepository(User);
    let found = await repository.findOne({
        where: { email: profile.email }
    });

    if (!found) {
        const file = await uploadFile(profile.picture.data.url, `user/${profile.email}/profile-picture`);

        found = {
            email: profile.email,
            firstName: profile.first_name,
            lastName: profile.last_name,
            pictureGUID: file.guid,
            permissionMask: defaultPermissionMask,
            lastViewed: []
        };

    }

    if (env.administrators.includes(found.email)) {
        found.permissionMask = computeAdminPermissionMask();
    }

    found = await repository.save(found);

    return found;
}

async function setAuthCookie(user: User, response: Response) {
    const token = await createToken({
        email: user.email,
        expires: new Date().getTime() + JWTCookieMaxAge
    });

    response.cookie(JWTCookieName, token, {
        maxAge: JWTCookieMaxAge,
        httpOnly: true
    });
}