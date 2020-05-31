import { Token } from 'typedi';

export default interface JWTConfiguration {
    secret: string;
    maxAge: number;
    cookieName: string;
}

export const JWTConfigurationToken = new Token<JWTConfiguration>('JWTConfiguration');
