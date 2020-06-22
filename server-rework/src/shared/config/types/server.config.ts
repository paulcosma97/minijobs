import { Token } from 'typedi';

export default interface ServerConfiguration {
    production: boolean;
    basePath: string;
    serverless: boolean;
    environment: string;
    runningTests: boolean;
    runningCI: boolean;
    runningLocally: boolean;
}

export const ServerConfigurationToken = new Token<ServerConfiguration>('ServerConfiguration');
