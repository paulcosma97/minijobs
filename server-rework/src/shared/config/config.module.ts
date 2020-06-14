import Module from '../module/module.interface';
import {ConfigurationPrototype} from '../module/make-config';
import {JWTConfigurationToken} from './types/jwt.config';
import {jwtConfiguration} from './values/jwt.config';
import {ServerConfigurationToken} from './types/server.config';
import {serverConfiguration} from './values/server.config';

export default class ConfigurationModule implements Module {
    getConfigurations(): ConfigurationPrototype<any>[] {
        return [
            { token: ServerConfigurationToken, value: serverConfiguration },
            { token: JWTConfigurationToken, value: jwtConfiguration },
        ];
    }
}
