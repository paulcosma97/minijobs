import { DocumentNode } from "graphql";
import { IResolvers } from "apollo-server-lambda";

export default interface GraphQLRouter {
    typeDefs: DocumentNode;
    resolvers: IResolvers;
}
