import Module from './module/module.interface';
import JWTAuthorizer from './auth/jwt.authorizer';
import AuthService from './auth/auth.service';
import CookieHandlerImpl from './cookie/cookie-handler.service';
import HeaderHandlerFactory from './headers/header-handler.factory';
import DynamoDocumentClientDummy from './repository/dynamo-document-client.dummy';
import DynamoDocumentClientFactory from './repository/dynamo-document-client.factory';

export default class SharedModule implements Module {
    getDeclarations(): Function[] {
        return [
            JWTAuthorizer,
            AuthService,
            CookieHandlerImpl,
            DynamoDocumentClientDummy
        ];
    }

    getFactories(): Function[] {
        return [
            HeaderHandlerFactory,
            DynamoDocumentClientFactory
        ]
    }
}