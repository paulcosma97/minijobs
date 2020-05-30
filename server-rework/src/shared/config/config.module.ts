import Module from '../module/module.interface';
import makeConfig from '../module/make-config';
import { JWTConfigurationToken } from './types/jwt.config';
import { jwtConfiguration } from './values/jwt.config';
import { ServerConfigurationToken } from './types/server.config';
import { serverConfiguration } from './values/server.config';

export default class ConfigurationModule implements Module {
    getFactories() {
        return [
            makeConfig(JWTConfigurationToken, jwtConfiguration),
            makeConfig(ServerConfigurationToken, serverConfiguration)
        ];
    }
}
