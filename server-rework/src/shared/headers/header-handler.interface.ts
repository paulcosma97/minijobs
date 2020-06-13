import { Token } from 'typedi';

export default interface HeaderHandler {
    getHeader(name: string): string;
    setHeader(name: string, value: string): void;
}

export const HeaderHandlerToken = new Token<HeaderHandler>('HeaderHandler');