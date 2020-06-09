import * as Express from 'express';
import {Container} from "typedi";
import {JWTConfigurationToken} from "../config/types/jwt.config";
import {UserRepositoryToken} from "../modules/user/repository/user.repository";
import AuthService from "./auth.service";
import {Permission} from './permission.enum';
import {UnauthorizedError} from './error/auth.errors';
import JWTToken from "./types/jwt-token.interface";
import {ForbiddenError} from "../../../../server/src/utils/error-handler";

export function hasPermissions(...permissionsArgs: Permission[]): Express.RequestHandler {
    const permissions = permissionsArgs || [];

    return async (req, res, next) => {
        const authService = Container.get(AuthService);
        const jwtConfig = Container.get(JWTConfigurationToken);
        const userRepository = Container.get(UserRepositoryToken);

        const token: string = req.cookies[jwtConfig.cookieName];

        // If token doesn't exist, go to next handler only if is permitted
        if (!token) {
            throw new UnauthorizedError();
        }

        let tokenPayload: JWTToken;
        try {
            tokenPayload = await authService.decodeToken(token);
        } catch (e) {
            res.clearCookie(jwtConfig.cookieName);
            throw new UnauthorizedError('Could not decode token.');
        }

        const user = await userRepository.findOneByOrFail('email', tokenPayload.email).catch(() => {
            res.clearCookie(jwtConfig.cookieName);
            throw new UnauthorizedError(`User '${tokenPayload.email}' could not be found.`);
        });

        const hasAllPermissions = permissions.every(requiredPermission =>
            user.permissions.find(userPermission => requiredPermission === userPermission));

        if (!hasAllPermissions) {
            throw new ForbiddenError(`User '${user.email}' is missing required permissions.`);
        }

        // Update cookie if older than half of lifespan
        if (new Date().getTime() - tokenPayload.expires < jwtConfig.maxAge / 2) {
            await authService.setAuthCookie(user, res);
        }

        res.locals = res.locals || {};
        res.locals.user = user;

        next();
    };
}

export const isAuthenticated = hasPermissions();
