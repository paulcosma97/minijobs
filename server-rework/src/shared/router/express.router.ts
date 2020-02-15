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

    protected get(path: string, handler: RequestHandler): void {
        this.createRoute(path, 'get', handler);
    }

    protected post(path: string, handler: RequestHandler): void {
        this.createRoute(path, 'post', handler);
    }

    protected put(path: string, handler: RequestHandler): void {
        this.createRoute(path, 'put', handler);
    }

    protected delete(path: string, handler: RequestHandler): void {
        this.createRoute(path, 'delete', handler);
    }

    protected head(path: string, handler: RequestHandler): void {
        this.createRoute(path, 'head', handler);
    }

    protected all(path: string, handler: RequestHandler): void {
        this.createRoute(path, 'all', handler);
    }
}
