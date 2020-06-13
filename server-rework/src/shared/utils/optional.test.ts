import test  from 'ava';
import Optional from './optional';
import {BaseError} from './error';

const throwsOn = [undefined, null];
const passableValues = [0, 1, true, false, [], {}, '', 'test'];

test('Optional#of', it => {
    it.truthy(Optional.of);
    it.true(Optional.of(null) instanceof Optional);
});

test('Optional#get', it => {
    for (const passableValue of passableValues) {
        it.is(Optional.of(passableValue).get(), passableValue);
    }

    for (const throwsOnElement of throwsOn) {
        it.throws(() => Optional.of(throwsOnElement).get());
    }
});

test('Optional#isEmpty', it => {
    for (const passableValue of passableValues) {
        it.false(Optional.of(passableValue).isEmpty());
    }

    for (const throwsOnElement of throwsOn) {
        it.true(Optional.of(throwsOnElement).isEmpty());
    }
});

test('Optional#exists', it => {
    for (const passableValue of passableValues) {
        it.true(Optional.of(passableValue).exists());
    }

    for (const throwsOnElement of throwsOn) {
        it.false(Optional.of(throwsOnElement).exists());
    }
});

test('Optional#orElse', it => {
    for (const passableValue of passableValues) {
        it.is(Optional.of(passableValue).orElse(100), passableValue);
    }

    for (const throwsOnElement of throwsOn) {
        it.is(Optional.of(throwsOnElement).orElse(1), 1);
    }
});

test('Optional#orThrow', it => {
    class CustomError extends BaseError {}
    const throwsCustomError = () => {
        throw new CustomError();
    };

    for (const passableValue of passableValues) {
        it.is(Optional.of(passableValue).orThrow(new CustomError()), passableValue);
    }

    for (const throwsOnElement of throwsOn) {
        it.throws(() => Optional.of(throwsOnElement).orThrow(new CustomError()));
        it.throws(() => Optional.of(throwsOnElement).orThrow(throwsCustomError));
    }
});