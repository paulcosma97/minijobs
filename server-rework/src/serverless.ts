import * as AWSLambda from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express'
import app from './main';

const server = awsServerlessExpress.createServer(app);

export const handler = (event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context) => {
    awsServerlessExpress.proxy(server, event, context);
}
