import '../../mocha-runner';
import {expect} from 'chai';
import makeSelfPath from './make-self-path';
import {Container} from 'typedi';
import {ServerPortToken} from '../request/express.interface';

describe('makeSelfPath', () => {
    it('returns the correct path', () => {
        expect(makeSelfPath('/hello-world')).to.equal(`http://localhost:${Container.get(ServerPortToken)}/hello-world`);
    })
})