import {Inject, Service} from 'typedi';
import JWTConfiguration, {JWTConfigurationToken} from '../config/types/jwt.config';
import JWTToken from './types/jwt-token.interface';
import {sign, verify} from 'jsonwebtoken';
import User from '../modules/user/model/user.model';
import {Response} from 'express';
import UserRepository, {UserRepositoryToken} from '../modules/user/repository/user.repository';

@Service()
export default class AuthService {
    constructor(
        @Inject(JWTConfigurationToken) private jwtConfig: JWTConfiguration,
        @Inject(UserRepositoryToken) private userRepository: UserRepository
    ) {}

    public decodeToken(token: string): Promise<JWTToken> {
        return new Promise((resolve, reject) => {
            verify(token, this.jwtConfig.secret, (err, decoded: JWTToken) =>
                err || decoded.expires <= Date.now() ? reject() : resolve(decoded)
            );
        });
    }

    public encodeToken(token: JWTToken): Promise<string> {
        return new Promise((resolve, reject) =>
            sign(token, this.jwtConfig.secret, (err, token: string) =>
                err ? reject(err) : resolve(token)
            )
        );
    }

    clearCookie(response: Response): void {
        response.clearCookie(this.jwtConfig.cookieName);

    }

    async setAuthCookie(user: User, response: Response): Promise<void> {
        this.clearCookie(response);

        const token: JWTToken = {
            email: user.email,
            expires: new Date().getTime() + this.jwtConfig.maxAge
        };

        const rawToken = await this.encodeToken(token);

        response.cookie(this.jwtConfig.cookieName, rawToken, {
            maxAge: this.jwtConfig.maxAge,
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(token.expires)
        });
    }
}
