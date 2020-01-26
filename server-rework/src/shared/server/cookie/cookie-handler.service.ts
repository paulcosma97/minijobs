import { Service, Inject } from 'typedi';
import CookieHandler, { CookieHandlerToken, CookieArgs } from './cookie-handler.interface';
import HeaderHandler, { HeaderHandlerToken } from '../headers/header-handler.interface';
import * as cookie from 'cookie';

@Service(CookieHandlerToken)
export default class CookieHandlerImpl implements CookieHandler {
    constructor(@Inject(HeaderHandlerToken) private headerHandler: HeaderHandler) {}

    getCookie(name: string): string {
        return cookie.parse(this.headerHandler.getHeader('cookie'))[name];
    }

    setCookie({ name, value, maxAge, httpOnly }: CookieArgs): void {
        this.headerHandler.setHeader('Set-Cookie', cookie.serialize(name, value, { httpOnly, maxAge, path: '/' }));
    }
}
