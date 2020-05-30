import { Router } from 'express';

export default interface ExpressRouter {
    getRouter(): Router;
    resourcePath: string;
}
