import { Token } from 'typedi';
import { Request, Response } from 'express';

export const ExpressRequestToken = new Token<Request>('ExpressRequest');
export const ExpressResponseToken = new Token<Response>('ExpressResponse');
