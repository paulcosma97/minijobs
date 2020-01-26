import * as AWSLambda from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import appModule from './main';
import LambdaHeaderHandler from './shared/server/headers/lambda-header-handler.service';
import Container from 'typedi';
import { HeaderHandlerToken } from './shared/server/headers/header-handler.interface';
import { APIGatewayEventToken } from './shared/server/request/lambda.interface';

const serverPromise = (async () => {
    const defs = await appModule.computeGraphQLDefinitions();
    return new ApolloServer({
        typeDefs: defs.typeDefs,
        resolvers: defs.resolvers
    });
})();

export const handler = (
    event: AWSLambda.APIGatewayEvent,
    context: AWSLambda.Context,
    callback: AWSLambda.Callback<AWSLambda.APIGatewayProxyResult>
) => {
    Container.set(APIGatewayEventToken, event);

    serverPromise.then(server => {
        server.createHandler()(event, context, (err, result) => {
            const headerHandler: LambdaHeaderHandler = Container.get(HeaderHandlerToken) as any;

            result.headers = {
                ...result.headers,
                ...headerHandler.outgoingHeaders
            };

            console.log(event, result.headers);
            callback(err, result);
        });
    });
};
