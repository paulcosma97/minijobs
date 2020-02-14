import { Service, Inject } from 'typedi';
import GraphQLRouter from '../../../shared/module/graphql.router';
import { gql } from 'apollo-server-lambda';
import CookieHandler, { CookieHandlerToken } from '../../../shared/cookie/cookie-handler.interface';

@Service()
export class UserRouter implements GraphQLRouter {
    constructor(@Inject(CookieHandlerToken) private cookieHandler: CookieHandler) {}

    getTypeDefs = () => gql`
        type Query {
            greet(name: String!): String
            getCookie(name: String!): String
        }

        type Mutation {
            setCookie(name: String!, value: String!): String
        }
    `;

    getResolvers = () => ({
        Query: {
            greet: (_, { name }) => `Hello, ${name}!`,
            getCookie: (_, { name }) => this.cookieHandler.getCookie(name)
        },
        Mutation: {
            setCookie: (_, { name, value }) => {
                this.cookieHandler.setCookie({ name, value, maxAge: 60 * 60 * 24, httpOnly: true });
                return value;
            }
        }
    });
}
