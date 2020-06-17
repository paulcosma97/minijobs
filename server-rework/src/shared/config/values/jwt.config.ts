import JWTConfiguration from '../types/jwt.config';

export const jwtConfiguration: JWTConfiguration = {
    secret: process.env.JWT_SECRET || 'secret',
    maxAge: 60 * 60 * 24 * 14, // 14 days
    cookieName: 'mj_user'
};
