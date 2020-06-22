import {BaseError, ErrorResponse} from '../utils/error';
import {ValidationError} from 'class-validator';

export default class BadRequestError extends BaseError {
    constructor(msg?: string, private errors?: ValidationError[]) {
        super(msg);
    }

    handle(): ErrorResponse | Promise<ErrorResponse> {
        return {
            statusCode: 400,
            message: this.msg,
            details: this.errors,
            i18n: 'errors.badRequest'
        }
    }
}