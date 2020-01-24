import { Token } from "typedi";

export default interface ServerConfiguration {
    production: boolean;
    basePath: string;
}

export const ServerConfigurationToken = new Token<ServerConfiguration>('ServerConfiguration');