import {Token} from 'typedi';

export const APIGatewayEventToken = new Token<AWSLambda.APIGatewayEvent>('APIGatewayEvent');