import Module from '../../module/module.interface';
import { UserRouter } from './route/user.router';
import UserRepositoryFactory from './repository/user-repository.factory';
import {UserConfigurationToken} from './config/user.config';
import {userConfig} from './config/values/user.config';
import {ConfigurationPrototype} from '../../module/make-config';

export default class UserModule implements Module {
    getDeclarations(): Function[] {
        return [
            UserRouter
        ];
    }

    getFactories(): Function[] {
        return [
            UserRepositoryFactory
        ];
    }

    getConfigurations(): ConfigurationPrototype<any>[] {
        return [{
            token: UserConfigurationToken,
            value: userConfig
        }]
    }
}