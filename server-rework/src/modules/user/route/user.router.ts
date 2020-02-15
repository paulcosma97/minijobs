import { Service, Inject } from 'typedi';
import CookieHandler, { CookieHandlerToken } from '../../../shared/cookie/cookie-handler.interface';
import AbstractExpressRouter from '../../../shared/router/express.router';

@Service()
export class UserRouter extends AbstractExpressRouter {
    constructor(@Inject(CookieHandlerToken) private cookieHandler: CookieHandler) {
        super('/users');
    }

    getUser = this.get('/', (_, res) => res.json({ greet: 'Hello user!' }));
}
