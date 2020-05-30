import ServiceFactory from './factory';
import { Token } from 'typedi';

export default function makeConfig<T>(token: Token<T>, value: T) {
    return class extends ServiceFactory<T> {
        getToken() {
            return token;
        }

        build(): T {
            return value;
        }
    };
}
