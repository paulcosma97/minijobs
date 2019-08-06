import { Router } from 'express';
import axios from 'axios';
import { restrictAccess, createToken, JWTCookieMaxAge, JWTCookieName, AuthenticatedState } from '../services/auth';
import { getRepository } from 'typeorm';
import { User, defaultPermissionMask } from '../models/user.model';
import { UserPermissionMask } from '../utils/permissions';
export const router = Router();

router.post('/auth', (req, res) => (async () => {
    const { accessToken } = req.body as { accessToken: string };
    const fbResponse = await axios.get<FacebookAuthAPIResponse>('https://graph.facebook.com/v4.0/me?fields=name,first_name,last_name,picture,email&access_token=' + accessToken)
        .then(res => res.data);

    const repository = await getRepository(User);
    let found = await repository.findOne({ where: { email: fbResponse.email } });

    if (!found) {
        const user: User = {
            email: fbResponse.email,
            firstName: fbResponse.first_name,
            lastName: fbResponse.last_name,
            picture: fbResponse.picture.data.url,
            permissionMask: defaultPermissionMask
        };

        found = await repository.save(user);
    }

    const token = await createToken({ email: found.email, expires: new Date().getTime() + JWTCookieMaxAge });
    res.cookie(JWTCookieName, token, { maxAge: JWTCookieMaxAge, httpOnly: true });

    return res.json(found);
})())

router.get('/profile', restrictAccess({
        authenticated: AuthenticatedState.AUTHENTICATED,
        permissions: [ UserPermissionMask.CanLogin ]
    }), (req, res) => {

    res.json(res.locals.user);
})

router.post('/logout', (req, res) => {
    res.clearCookie(JWTCookieName);
    res.json({});
})


export interface FacebookAuthAPIResponse {
    name: string;
    first_name: string;
    last_name: string;
    picture: {
        data: {
            height: number;
            is_silhouette: boolean;
            url: string;
            width: number
        }
    };
    email: string;
    id: number;
}