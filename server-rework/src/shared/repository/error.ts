import {BaseError, ErrorResponse} from '../utils/error';

export class EntityNotFoundError extends BaseError {
    handle(): ErrorResponse | Promise<ErrorResponse> {
        return {
            statusCode: 404,
            message: 'Not found.',
            i18n: 'errors.notFound'
        }
    }
}