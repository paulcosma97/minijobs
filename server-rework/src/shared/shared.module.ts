import Module from './module/module.interface';
import JWTAuthorizer from './auth/jwt.authorizer';
import AuthService from './auth/auth.service';
import CookieHandlerImpl from './cookie/cookie-handler.service';
import HeaderHandlerFactory from './headers/header-handler.factory';

export default class SharedModule implements Module {
    getDeclarations(): Function[] {
        return [
            JWTAuthorizer,
            AuthService,
            CookieHandlerImpl
        ];
    }

    getFactories(): Function[] {
        return [
            HeaderHandlerFactory
        ]
    }
}