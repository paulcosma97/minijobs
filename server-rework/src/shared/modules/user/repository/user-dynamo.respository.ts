import DynamoRepository from '../../../repository/dynamo.repository';
import UserRepository, {UserRepositoryToken} from './user.repository';
import User from '../model/user.model';
import {Inject, Service} from 'typedi';
import ServerConfiguration, {ServerConfigurationToken} from '../../../config/types/server.config';
import UserConfiguration, {UserConfigurationToken} from '../config/user.config';
import {DynamoDocumentClientToken} from '../../../repository/dynamo-document-client';
import { DynamoDB } from 'aws-sdk';

@Service(UserRepositoryToken)
export default class UserDynamoRepository extends DynamoRepository<User> implements UserRepository {
    constructor(
        @Inject(ServerConfigurationToken) serverConfig: ServerConfiguration,
        @Inject(UserConfigurationToken) userConfig: UserConfiguration,
        @Inject(DynamoDocumentClientToken) dynamoClient: DynamoDB.DocumentClient
    ) {
        super(userConfig.tableName, serverConfig, dynamoClient);
    }
}
