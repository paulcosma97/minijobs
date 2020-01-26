import { DocumentNode } from "graphql";
import { IResolvers } from "apollo-server-lambda";

export default interface GraphQLRouter {
    // getTypeDefs(): DocumentNode;
    getResolvers(): IResolvers;
}
