import ServiceFactory from '../../../module/factory';
import UserRepository, {UserRepositoryToken} from './user.repository';
import {Inject, Service, Token} from 'typedi';
import UserDynamoRepository from './user-dynamo.respository';
import ServerConfiguration, {ServerConfigurationToken} from '../../../config/types/server.config';
import UserConfiguration, {UserConfigurationToken} from '../config/user.config';

@Service()
export default class UserRepositoryFactory extends ServiceFactory<UserRepository> {
    constructor(
        @Inject(ServerConfigurationToken) private serverConfig: ServerConfiguration,
        @Inject(UserConfigurationToken) private userConfig: UserConfiguration
    ) {
        super();
    }

    getToken(): Token<UserRepository> {
        return UserRepositoryToken;
    }

    build(): UserRepository {
        return new UserDynamoRepository(this.userConfig.tableName, this.serverConfig);
    }
}