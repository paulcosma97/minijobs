import {BaseError, ErrorResponse} from '../../utils/error';
import * as Express from 'express';
import {Container} from 'typedi';
import {JWTConfigurationToken} from '../../config/types/jwt.config';

export class UnauthorizedError extends BaseError {
    constructor(msg?: string) {
        super(msg);
    }

    async handle(res: Express.Response): Promise<ErrorResponse> {
        const jwtConfiguration = Container.get(JWTConfigurationToken);
        res.clearCookie(jwtConfiguration.cookieName);

        return {
            statusCode: 401,
            i18n: 'errors.unauthorized'
        }
    }
}

export class ForbiddenError extends BaseError {
    constructor(msg?: string) {
        super(msg);
    }

    async handle(res: Express.Response): Promise<ErrorResponse> {
        return {
            statusCode: 403,
            i18n: 'errors.forbidden'
        }
    }
}
