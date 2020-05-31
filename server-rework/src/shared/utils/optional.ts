import {BaseError} from "./error";

export class EmptyOptionalError extends BaseError {}

export default class Optional<T> {
    static of<T>(item: T | null | undefined): Optional<T> {
        return new Optional(item);
    }

    static readonly empty = Optional.of(null);

    private constructor(private item: T | null | undefined) {
    }

    isEmpty(): boolean {
        return this.item === undefined || this.item === null;
    }

    get(): T | never {
        if (this.isEmpty()) {
            throw new EmptyOptionalError();
        }

        return this.item;
    }

    orThrow<Err extends BaseError>(e: { new(): Err }): T | never {
        if (this.isEmpty()) {
            throw new e;
        }

        return this.item;
    }

    orElse(other: T): T {
        if (this.isEmpty()) {
            return other;
        }

        return this.item;
    }

    exists(): boolean {
        return !this.isEmpty();
    }
}