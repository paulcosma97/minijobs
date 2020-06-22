import Module from '../../module/module.interface';
import { UserRouter } from './route/user.router';
import {UserConfigurationToken} from './config/user.config';
import {userConfig} from './config/values/user.config';
import {ConfigurationPrototype} from '../../module/make-config';
import UserDynamoRepository from './repository/user-dynamo.respository';
import UserService from './service/user.service';

export default class UserModule implements Module {
    getDeclarations(): Function[] {
        return [
            UserRouter,
            UserDynamoRepository,
            UserService
        ];
    }

    getConfigurations(): ConfigurationPrototype<any>[] {
        return [{
            token: UserConfigurationToken,
            value: userConfig
        }]
    }
}