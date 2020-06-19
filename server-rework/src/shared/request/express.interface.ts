import { Token } from 'typedi';
import {Application, Request, Response} from 'express';

export const ExpressRequestToken = new Token<Request>('ExpressRequest');
export const ExpressResponseToken = new Token<Response>('ExpressResponse');
export const ExpressApplicationToken = new Token<Application>('ExpressApplication');
export const ServerPortToken = new Token<number>('ServerPort');
