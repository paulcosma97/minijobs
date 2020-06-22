import {validate} from 'class-validator';
import BadRequestError from '../error/bad-request.error';

export function createValidator<T>(forClass: { new(...args): T }): (obj: T) => Promise<void | never> {
    return async (obj) => {
        const instance = new forClass();
        Object.assign(instance, obj);
        const errors = await validate(instance);

        if (errors && errors.length > 0) {
            throw new BadRequestError('One or more invalid properties.', errors);
        }
    }
}