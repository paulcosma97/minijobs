import Optional from './optional';
import {GenericServerError} from './error';
import { expect } from 'chai';

const throwsOn: any[] = [undefined, null];
const passableValues: any[] = [0, 1, true, false, [], {}, '', 'test'];

describe('Optional', () => {
    it('#of', () => {
        expect(Optional.of(null) instanceof Optional).to.be.true;
    });

    it('#get', () => {
        for (const passableValue of passableValues) {
            expect(Optional.of(passableValue).get()).to.equal(passableValue);
        }

        for (const throwsOnElement of throwsOn) {
            expect(() => Optional.of(throwsOnElement).get()).to.throw();
        }
    });

    it('#isEmpty', () => {
        for (const passableValue of passableValues) {
            expect(Optional.of(passableValue).isEmpty()).to.be.false;
        }

        for (const throwsOnElement of throwsOn) {
            expect(Optional.of(throwsOnElement).isEmpty()).to.be.true;
        }
    });

    it('#exists', () => {
        for (const passableValue of passableValues) {
            expect(Optional.of(passableValue).exists()).to.be.true;
        }

        for (const throwsOnElement of throwsOn) {
            expect(Optional.of(throwsOnElement).exists()).to.be.false
        }
    });

    it('#orElse', () => {
        for (const passableValue of passableValues) {
            expect(Optional.of(passableValue).orElse(100)).to.equal(passableValue);
        }

        for (const throwsOnElement of throwsOn) {
            expect(Optional.of(throwsOnElement).orElse(1)).to.equal(1);
        }
    });

    it('#orThrow', () => {
        const throwsCustomError = () => {
            throw new GenericServerError();
        };

        for (const passableValue of passableValues) {
            expect(Optional.of(passableValue).orThrow(new GenericServerError())).to.equal(passableValue);
        }

        for (const throwsOnElement of throwsOn) {
            expect(() => Optional.of(throwsOnElement).orThrow(new GenericServerError())).to.throw;
            expect(() => Optional.of(throwsOnElement).orThrow(throwsCustomError)).to.throw;
        }
    });
})

