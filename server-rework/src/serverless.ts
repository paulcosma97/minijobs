import * as AWSLambda from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import app from './main';


const server = new ApolloServer({
    resolvers: app.graphQLDefinitions[0].resolvers,
    typeDefs: app.graphQLDefinitions[0].typeDefs
})

export const handler = (event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context, callback) => {
    server.createGraphQLServerOptions(event, context);
    return server.createHandler()(event, context, callback)
}
