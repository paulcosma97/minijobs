import HeaderHandler from './header-handler.interface';
import { Request, Response } from 'express';

export default class ExpressHeaderHandler implements HeaderHandler {
    constructor(private getRequest: () => Request, private getResponse: () => Response) {}

    getHeader(name: string): string {
        return (this.getRequest().headers[name] as any) || '';
    }
    setHeader(name: string, value: string): void {
        this.getResponse().setHeader(name, value);
    }
}
