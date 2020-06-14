import CompositeModule from './module/composite-module';
import Module from './module/module.interface';
import ExpressRouter from './router/express-router.interface';
import ServiceFactory from './module/factory';
import * as express from 'express';
import * as cors from 'cors';
import Container from 'typedi';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { ExpressRequestToken, ExpressResponseToken } from './request/express.interface';
import {ConfigurationPrototype} from './module/make-config';

const isExpressRouter = (instance: any): instance is ExpressRouter => !!instance.getRouter;

export default class AppModule {
    private readonly expressApp: express.Application;

    constructor(private modules: Module[]) {
        this.expressApp = express();
        this.init();
    }

    private init(): void {
        this.expressApp.use('*', cors());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use('*', compression());
        this.expressApp.use('*', (req, res, next) => {
            Container.set(ExpressRequestToken, req);
            Container.set(ExpressResponseToken, res);
            next();
        });
    }

    initializeDeclarations(): void {
        const module = new CompositeModule(this.modules);
        const configs = module.getConfigurations();
        const declarations = module.getDeclarations();
        Container.import(declarations);
        // Container.set({
        //
        // })

        const factories = module.getFactories();

        configs
            .forEach((config: ConfigurationPrototype<any>) =>
                Container.set(config.token, config.value)
            );

        Container.import(factories);
        factories
            .map(factoryClass => Container.get(factoryClass))
            .forEach((factory: ServiceFactory<any>) =>
                Container.set(factory.getToken(), factory.build())
            );

        declarations
            .map(declaration => Container.get(declaration))
            .filter(isExpressRouter)
            .forEach(router => {
                console.info(`Found express router ${router.constructor.name}.`);
                this.expressApp.use(router.resourcePath, router.getRouter());
            });
    }

    get application(): express.Application {
        return this.expressApp;
    }
}
