import { Token } from 'typedi';

export default interface ServerConfiguration {
    production: boolean;
    basePath: string;
    serverless: boolean;
    environment: string;
}

export const ServerConfigurationToken = new Token<ServerConfiguration>('ServerConfiguration');
