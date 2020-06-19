import {Inject, Service} from 'typedi';
import CookieHandler, {CookieHandlerToken} from '../../../cookie/cookie-handler.interface';
import AbstractExpressRouter from '../../../router/express.router';
import {isAuthenticated} from '../../../auth/authorizer';

@Service()
export class UserRouter extends AbstractExpressRouter {
    constructor(@Inject(CookieHandlerToken) private cookieHandler: CookieHandler) {
        super('/users');
    }

    getUser = this.get('/profile', isAuthenticated, (_, res) =>
        res.json({
            ...res.locals.user,
            password: undefined
        })
    );

    // login = this.post('/login', )
}
