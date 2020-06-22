import CompositeModule from './module/composite-module';
import Module from './module/module.interface';
import ExpressRouter from './router/express-router.interface';
import ServiceFactory from './module/factory';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import Container from 'typedi';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import {
    ExpressApplicationToken,
    ExpressRequestToken,
    ExpressResponseToken,
    ServerPortToken
} from './request/express.interface';
import {ConfigurationPrototype} from './module/make-config';

const isExpressRouter = (instance: any): instance is ExpressRouter => !!instance.getRouter;

export default class AppModule {
    private readonly expressApp: express.Application;

    constructor(private modules: Module[]) {
        this.expressApp = express();
        this.init();
    }

    private init(): void {
        this.expressApp.use('*', cors({
            origin: (_, cb) => cb(null, true),
            credentials: true
        }));
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cookieParser());
        this.expressApp.use('*', compression());
        this.expressApp.use('*', (req, res, next) => {
            Container.set(ExpressRequestToken, req);
            Container.set(ExpressResponseToken, res);

            console.log(`Request: ${new Date().toISOString()} - ${req.method} @ ${req.path}`);
            next();
        });
        Container.set(ExpressApplicationToken, this.expressApp);
        Container.set(ServerPortToken, 3000);
    }

    initializeDeclarations(): void {
        const module = new CompositeModule(this.modules);
        const configs = module.getConfigurations();
        const declarations = module.getDeclarations();
        Container.import(declarations);

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
                this.expressApp.use(router.resourcePath, router.getRouter());
            });
    }

    get application(): express.Application {
        return this.expressApp;
    }
}
