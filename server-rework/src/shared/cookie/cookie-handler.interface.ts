import { Token } from 'typedi';

export interface CookieArgs {
    name: string;
    value: string;
    maxAge: number;
    httpOnly: boolean;
}

export default interface CookieHandler {
    getCookie(name: string): string;
    setCookie(args: CookieArgs): void;
}

export const CookieHandlerToken = new Token<CookieHandler>('CookieHandler');
