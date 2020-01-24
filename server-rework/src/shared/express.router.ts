import { Router, RequestHandler } from "express";

export default abstract class ExpressRouter {
    private readonly router: Router = Router();

    registerRoute(method: string, path: string, requestHandler: RequestHandler) {
        this.router[method](path, requestHandler);
        console.info(`Endpoint [ ${method.toUpperCase()} @ ${path} ] bound to controller ${this.constructor.name}.`);
    }

    getRoutes(): Router {
        return this.router;
    }
}
