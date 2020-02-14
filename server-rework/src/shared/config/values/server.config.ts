import ServerConfiguration from '../server.config';

export const serverConfiguration: ServerConfiguration = {
    production: !!process.env.PRODUCTION,
    basePath: process.env.BASE_PATH || '/',
    serverless: !!process.env.SERVERLESS || false,
    environment: !!process.env.PRODUCTION ? 'production' : 'dev'
};
