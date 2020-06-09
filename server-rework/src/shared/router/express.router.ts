import ExpressRouter from './express-router.interface';
import { Router, RequestHandler } from 'express';

export default abstract class AbstractExpressRouter implements ExpressRouter {
    private router = Router();

    constructor(public resourcePath: string) {
        console.log(`🌌  Initialized router for resource ${this.resourcePath}.`);
    }

    getRouter(): Router {
        return this.router;
    }

    private createRoute(path: string, method: string, ...handler: RequestHandler[]): void {
        this.router[method](path, ...handler);
        console.log(
            `📦  Created endpoint: ${method} @ ${this.resourcePath}${path === '/' ? '' : path}`
        );
    }

    protected get(path: string, ...handlers: RequestHandler[]): void {
        this.createRoute(path, 'get', ...handlers);
    }

    protected post(path: string, ...handlers: RequestHandler[]): void {
        this.createRoute(path, 'post', ...handlers);
    }

    protected put(path: string, ...handlers: RequestHandler[]): void {
        this.createRoute(path, 'put', ...handlers);
    }

    protected delete(path: string, ...handlers: RequestHandler[]): void {
        this.createRoute(path, 'delete', ...handlers);
    }

    protected head(path: string, ...handlers: RequestHandler[]): void {
        this.createRoute(path, 'head', ...handlers);
    }

    protected all(path: string, ...handlers: RequestHandler[]): void {
        this.createRoute(path, 'all', ...handlers);
    }
}
