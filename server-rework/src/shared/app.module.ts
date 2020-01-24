import Container from "typedi";
import CompositeModule from "./module/composite-module";
import Module from "./module/module.interface";
import GraphQLRouter from "./module/graphql.router";
import { DocumentNode } from "graphql";
import { IResolvers } from "apollo-server-lambda";

const isGraphQLRouter = instance => instance.resolvers && instance.typeDefs ;

export default class AppModule {
    private gqlDefinitions: { typeDefs: DocumentNode; resolvers: IResolvers }[] = [];

    constructor(private modules: Module[]) {}

    initializeDeclarations() {
        const declarations = new CompositeModule(this.modules).getDeclarations();
        Container.import(declarations);

        declarations
            .map(declaration => Container.get(declaration))
            .filter(isGraphQLRouter)
            .forEach((router: GraphQLRouter) => {
                console.info(`Found GraphQL router ${router.constructor.name}.`);
                this.gqlDefinitions.push({ resolvers: router.resolvers, typeDefs: router.typeDefs })
            })
    }

    get graphQLDefinitions() {
        return this.gqlDefinitions;
    }
}