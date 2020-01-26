import Container from 'typedi';
import CompositeModule from './module/composite-module';
import Module from './module/module.interface';
import GraphQLRouter from './module/graphql.router';
import { DocumentNode } from 'graphql';
import { IResolvers, gql } from 'apollo-server-lambda';
import ServiceFactory from './module/factory';
import { readFile } from 'fs';
import * as path from 'path';

const isGraphQLRouter = instance => instance.getResolvers && instance.getTypeDefs;

export default class AppModule {
    private gqlDefinitions: IResolvers[] = [];

    constructor(private modules: Module[]) {}

    initializeDeclarations() {
        const module = new CompositeModule(this.modules);
        const declarations = module.getDeclarations();
        Container.import(declarations);

        const factories = module.getFactories();
        Container.import(factories);
        factories
            .map(factoryClass => Container.get(factoryClass))
            .forEach((factory: ServiceFactory<any>) => Container.set(factory.getToken(), factory.build()));

        declarations
            .map(declaration => Container.get(declaration))
            .filter(isGraphQLRouter)
            .forEach((router: GraphQLRouter) => {
                console.info(`Found GraphQL router ${router.constructor.name}.`);
                this.gqlDefinitions.push(router.getResolvers());
            });
    }

    async computeGraphQLDefinitions(): Promise<{ typeDefs: DocumentNode; resolvers: IResolvers }> {
        return {
            typeDefs: await new Promise((resolve, reject) =>
                readFile(path.join(__dirname, './graphql/schema.graphql'), (err, data) =>
                    err ? reject(err) : resolve(gql(data.toString()))
                )
            ),
            resolvers: this.gqlDefinitions as any
        };
    }
}
