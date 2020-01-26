import { Token } from 'typedi';

export default abstract class ServiceFactory<T> {
    abstract getToken(): Token<T>;
    abstract build(): T;
}
