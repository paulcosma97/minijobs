import * as Express from 'express';
import {Container} from "typedi";
import {JWTConfigurationToken} from "../config/types/jwt.config";
import {UserRepositoryToken} from "../modules/user/repository/user.repository";
import AuthService from "./auth.service";
import {Permission} from './permission.enum';
import {UnauthorizedError} from './error/auth.errors';
import JWTToken from "./types/jwt-token.interface";

export function hasPermissions(...permissionsArg: Permission[]): Express.RequestHandler {
    const permissions = permissionsArg || [];

    return async (req, res, next) => {
        const authService = Container.get(AuthService);
        const jwtConfig = Container.get(JWTConfigurationToken);
        const userRepository = Container.get(UserRepositoryToken);

        const token: string = req.cookies[jwtConfig.cookieName];

        // If token doesn't exist, go to next handler only if is permitted
        if (!token) {
            return next();
        }

        let tokenPayload: JWTToken;
        try {
            tokenPayload = await authService.decodeToken(token);
        } catch (e) {
            res.clearCookie(jwtConfig.cookieName);
            throw new UnauthorizedError('Could not decode token.');
        }

        const user = await userRepository.findByOrFail('email', tokenPayload.email).catch(() => {
            res.clearCookie(jwtConfig.cookieName);
            throw new UnauthorizedError(`User '${tokenPayload.email}' could not be found.`);
        });

        // Update cookie if older than half of lifespan
        if (new Date().getTime() - tokenPayload.expires < jwtConfig.maxAge / 2) {
            await authService.setAuthCookie(user, res);
        }

        res.locals = {
            user
        };

        next();
    };
}
