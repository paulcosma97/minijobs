import {Inject, Service, Token} from 'typedi';
import ServiceFactory from '../module/factory';
import { DynamoDB } from 'aws-sdk';
import {DynamoDocumentClientToken} from './dynamo-document-client';
import ServerConfiguration, {ServerConfigurationToken} from '../config/types/server.config';
import DynamoDocumentClientDummy from './dynamo-document-client.dummy';

@Service()
export default class DynamoDocumentClientFactory implements ServiceFactory<DynamoDB.DocumentClient> {
    constructor(
        @Inject(ServerConfigurationToken) private serverConfiguration: ServerConfiguration,
        private dummyDocumentClient: DynamoDocumentClientDummy
    ) {}


    getToken(): Token<DynamoDB.DocumentClient> {
        return DynamoDocumentClientToken;
    }

    build(): DynamoDB.DocumentClient {
        if (this.serverConfiguration.runningTests || this.serverConfiguration.runningLocally) {
            console.log('DynamoDocumentClientFactory', '- proceeding with dummy implementation of DynamoDB.DocumentClient')
            return this.dummyDocumentClient;
        } else {
            console.log('DynamoDocumentClientFactory', '- proceeding with real implementation of DynamoDB.DocumentClient')
            return new DynamoDB.DocumentClient();
        }
    }
}