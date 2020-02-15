import * as AWSLambda from 'aws-lambda';
import * as AWSServerlessExpress from 'aws-serverless-express';
import * as Express from 'express';

const app = Express();

app.all('*', (req, res) => {
    res.json({
        greeting: 'Hello World!'
    });
});

const server = AWSServerlessExpress.createServer(app);

// import { ApolloServer } from 'apollo-server-lambda';
// import appModule from './main';
// import LambdaHeaderHandler from './shared/headers/lambda-header-handler.service';
// import Container from 'typedi';
// import { HeaderHandlerToken } from './shared/headers/header-handler.interface';
// import { APIGatewayEventToken } from './shared/request/lambda.interface';

// const serverPromise = (async () => {
//     const defs = await appModule.computeGraphQLDefinitions();
//     return new ApolloServer({
//         typeDefs: defs.typeDefs,
//         resolvers: defs.resolvers,
//         playground: {
//             endpoint: '/production/api',
//             settings: {
//                 "request.credentials": "include"
//             }
//         }
//     });
// })();

export const handler = (event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context) => {
    return AWSServerlessExpress.proxy(server, event, context);

    // Container.set(APIGatewayEventToken, event);
    // serverPromise.then(server => {
    //     server.createHandler()(event, context, (err, result) => {
    //         const headerHandler: LambdaHeaderHandler = Container.get(HeaderHandlerToken) as any;

    //         result.headers = {
    //             ...result.headers,
    //             ...headerHandler.outgoingHeaders
    //         };

    //         console.log(event, result.headers, headerHandler.outgoingHeaders);
    //         callback(err, result);
    //     });
    // });
};
