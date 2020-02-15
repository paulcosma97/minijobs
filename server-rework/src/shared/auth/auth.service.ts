import { Service, Inject } from 'typedi';
import JWTConfiguration, { JWTConfigurationToken } from '../config/types/jwt.config';
import JWTToken from './types/jwt-token.interface';
import { verify, sign, VerifyErrors } from 'jsonwebtoken';
import axios from 'axios';
import FacebookProfile from './types/facebook-profile.dto';
import User from '../../modules/user/model/user.model';
import { Response } from 'express';

@Service()
export default class AuthService {
    constructor(@Inject(JWTConfigurationToken) private jwtConfig: JWTConfiguration) {}

    public decodeToken(token: string): Promise<JWTToken> {
        return new Promise((resolve, reject) => {
            verify(token, this.jwtConfig.secret, (err, decoded) =>
                err ? reject() : resolve(decoded)
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

    public async login(accessToken: string): Promise<User> {
        const profile = await this.getFacebookProfile(accessToken);
        const user = await createOrUpdateUser(profile);
        await setAuthCookie(user, response);
        return user;
    }

    private getFacebookProfile(accessToken: string): Promise<FacebookProfile> {
        return axios
            .get<FacebookProfile>(
                'https://graph.facebook.com/v4.0/me?fields=name,first_name,last_name,picture,email&access_token=' +
                    accessToken
            )
            .then(res => res.data);
    }

    private setAuthCookie(user: User, response: Response) {
        const token = await this.encodeToken({
            email: user.email,
            expires: new Date().getTime() + JWTCookieMaxAge
        });

        response.cookie(JWTCookieName, token, {
            maxAge: JWTCookieMaxAge,
            httpOnly: true
        });
    }
}
