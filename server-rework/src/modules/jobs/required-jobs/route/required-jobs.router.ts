import GraphQLRouter from '../../../../shared/module/graphql.router';
import { gql } from 'apollo-server-lambda';
import { Service } from 'typedi';

@Service()
export default class RequiredJobsRouter implements GraphQLRouter {
    getTypeDefs = () => gql`
        type Query {
            hello: String
        }
    `;

    getResolvers = () => ({
        Query: {
            hello: () => 'Hello world'
        }
    });
}
