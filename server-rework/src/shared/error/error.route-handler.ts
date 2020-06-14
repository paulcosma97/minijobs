import * as Express from 'express';
import {BaseError, ErrorResponse} from '../utils/error';

export default class ErrorRouteHandler {
    handleRoute = (fn: Express.RequestHandler): Express.RequestHandler => {
        return async (req, res, next) => {
            try {
                await fn(req, res, next);
            } catch (e) {
                if (e instanceof BaseError) {
                    await this.handleError(e, res);
                    return;
                }

                console.error('Unknown error thrown.', e);
                res.status(500);
                const response: ErrorResponse = {
                    statusCode: 500,
                    i18n: 'errors.critical',
                    message: 'Something went wrong.'
                }

                res.json(response);
            }
        }
    }

    async handleError(error: BaseError, res: Express.Response): Promise<void> {
        let response: ErrorResponse;

        try {
            response = await error.handle(res);
        } catch (e) {
            console.error('ErrorHandler mapping error.', error, e);
            response = {
                statusCode: 500,
                message: 'Could not handle error.',
                i18n: 'errors.critical'
            };
        }

        res.status(response.statusCode);
        res.json(response);
    }
}