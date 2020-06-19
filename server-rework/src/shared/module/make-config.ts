import {Token} from 'typedi';

export interface ConfigurationPrototype<T> {
    token: Token<T>
    value: T
}
