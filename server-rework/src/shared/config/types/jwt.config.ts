import { Token } from 'typedi';

export default interface JWTConfiguration {
    secret: string;
}

export const JWTConfigurationToken = new Token<JWTConfiguration>('JWTConfiguration');
