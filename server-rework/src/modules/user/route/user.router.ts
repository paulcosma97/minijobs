import { Service } from "typedi";
import GraphQLRouter from "../../../shared/module/graphql.router";
import { gql } from 'apollo-server-lambda';

@Service()
export class UserRouter implements GraphQLRouter {
    typeDefs = gql`
        type Query {
            greet: String
        }
    `;

    resolvers = {
        Query: {
            greet: () => "Hello World!"
        }
    };
}