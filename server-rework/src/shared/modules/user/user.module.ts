import Module from '../../module/module.interface';
import { UserRouter } from './route/user.router';
import UserRepositoryFactory from './repository/user-repository.factory';
import makeConfig from '../../module/make-config';
import {UserConfigurationToken} from './config/user.config';
import {userConfig} from './config/values/user.config';

export default class UserModule implements Module {
    getDeclarations(): Function[] {
        return [
            UserRouter
        ];
    }

    getFactories() {
        return [
            UserRepositoryFactory,
            makeConfig(UserConfigurationToken, userConfig)
        ];
    }
}