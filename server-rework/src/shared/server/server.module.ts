import Module from '../module/module.interface';
import Container from 'typedi';
import { ServerConfigurationToken } from './config/server.config';
import { serverConfiguration } from './config/values/server.config';
import HeaderHandlerFactory from './headers/header-handler.factory';
import CookieHandlerImpl from './cookie/cookie-handler.service';

export default class ServerModule implements Module {
    constructor() {
        Container.set(ServerConfigurationToken, serverConfiguration);
    }

    getDeclarations = () => [CookieHandlerImpl];

    getFactories = () => [HeaderHandlerFactory];
}
