import * as Express from 'express';

export interface ErrorResponse {
    statusCode: number;
    details?: Record<string, any> | Record<string, any>[];
    message?: string;
    i18n?: string;
}

export abstract class BaseError extends Error {
    constructor(protected msg?: string) {
        super(msg);
    }
    abstract handle(res: Express.Response): ErrorResponse | Promise<ErrorResponse>;
}

export class GenericServerError extends BaseError {
    handle(): ErrorResponse | Promise<ErrorResponse> {
        return {
            statusCode: 500,
            message: this.msg
        }
    }
}
