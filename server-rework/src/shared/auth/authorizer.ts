import * as Express from 'express';
import {Container} from 'typedi';
import {Permission} from './permission.enum';
import JWTAuthorizer from './jwt.authorizer';

export function hasPermissions(...permissionsArgs: Permission[]): Express.RequestHandler {
    const permissions = permissionsArgs || [];

    return async (req, res, next) => {
        const jwtAuthorizer = Container.get(JWTAuthorizer);

        const rawToken = jwtAuthorizer.extractRawToken(req);
        const token = await jwtAuthorizer.decodeRawToken(rawToken);
        const user = await jwtAuthorizer.extractUser(token);
        jwtAuthorizer.assertPermissions(user, permissions);
        jwtAuthorizer.setContextUser(res, user);
        if (jwtAuthorizer.shouldTokenBeRefreshed(token)) {
            await jwtAuthorizer.setToken(res, user);
        }

        next();
    };
}

export const isAuthenticated = hasPermissions();
