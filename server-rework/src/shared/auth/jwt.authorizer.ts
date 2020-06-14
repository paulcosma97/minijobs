import {Inject, Service} from 'typedi';
import AuthService from './auth.service';
import JWTConfiguration, {JWTConfigurationToken} from '../config/types/jwt.config';
import UserRepository, {UserRepositoryToken} from '../modules/user/repository/user.repository';
import * as express from 'express';
import Optional from '../utils/optional';
import {ForbiddenError, UnauthorizedError} from './error/auth.errors';
import JWTToken from './types/jwt-token.interface';
import User from '../modules/user/model/user.model';
import {Permission} from './permission.enum';

@Service()
export default class JWTAuthorizer {
    constructor(
        private authService: AuthService,
        @Inject(JWTConfigurationToken) private jwtConfig: JWTConfiguration,
        @Inject(UserRepositoryToken) private userRepository: UserRepository
    ) { }

    extractRawToken(request: express.Request): string {
        return Optional.of(request.cookies[this.jwtConfig.cookieName]).orThrow(new UnauthorizedError());
    }

    async decodeRawToken(token: string): Promise<JWTToken> {
        return await this.authService.decodeToken(token).catch(() => {
            throw new UnauthorizedError('Could not decode token.');
        });
    }

    async extractUser(token: JWTToken): Promise<User> {
        return await this.userRepository.findOneByOrFail('email', token.email).catch(() => {
            throw new UnauthorizedError(`User '${token.email}' could not be found.`);
        });
    }

    shouldTokenBeRefreshed(token: JWTToken): boolean {
        return new Date().getTime() - token.expires < this.jwtConfig.maxAge / 2;
    }

    setContextUser(res: express.Response, user: User): void {
        res.locals = res.locals || {};
        res.locals.user = user;
    }

    assertPermissions(user: User, permissions: Permission[]): void {
        const hasAllPermissions = permissions.every(requiredPermission =>
            user.permissions.find(userPermission => requiredPermission === userPermission));

        if (!hasAllPermissions) {
            throw new ForbiddenError(`User '${user.email}' is missing required permissions.`);
        }
    }

    setToken(res: express.Response, user: User): Promise<void> {
        return this.authService.setAuthCookie(user, res);
    }
}