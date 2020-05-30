import JWTConfiguration from '../types/jwt.config';

export const jwtConfiguration: JWTConfiguration = {
    secret: process.env.JWT_SECRET || 'secret'
};
