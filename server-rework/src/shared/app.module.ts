import Container, { Service } from "typedi";
import * as express from 'express';
import CompositeModule from "./composite-module";
import Module from "./module";
import ExpressRouter from "./express.router";

export default class AppModule {
    private app = express();

    constructor(private modules: Module[]) {}

    initializeDeclarations() {
        const declarations = new CompositeModule(this.modules).getDeclarations();
        Container.import(declarations);

        declarations
            .map(declaration => Container.get(declaration))
            .filter(instance => instance instanceof ExpressRouter)
            .forEach((router: ExpressRouter) => this.app.use(router.getRoutes()))
    }

    get expressApp() {
        return this.app;
    }
}