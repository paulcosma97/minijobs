import { Router, RequestHandler } from "express";
import Container from "typedi";
import { ServerConfigurationToken } from "../server/config/server.config";

export default abstract class ExpressRouter {
    private readonly router: Router = Router();
    private readonly serverConfig =  Container.get(ServerConfigurationToken);

    registerRoute(method: string, path: string, requestHandler: RequestHandler) {
        let basePath = this.serverConfig.basePath;

        if (basePath[basePath.length - 1] === '/') {
            basePath = basePath.slice(0, basePath.length - 1);
        }

        this.router[method](basePath + path, requestHandler);
        console.info(`Endpoint [ ${method.toUpperCase()} @ ${basePath + path} ] bound to controller ${this.constructor.name}.`);
    }

    getRoutes(): Router {
        return this.router;
    }
}
