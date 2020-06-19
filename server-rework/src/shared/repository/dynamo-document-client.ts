import {Token} from 'typedi';
import { DynamoDB } from 'aws-sdk';

export const DynamoDocumentClientToken = new Token<DynamoDB.DocumentClient>('DynamoDocumentClient')