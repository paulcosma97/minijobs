import '../../main';
import JWTAuthorizer from './jwt.authorizer';
import {Container} from 'typedi';
import AuthService from './auth.service';
import JWTToken from './types/jwt-token.interface';
import {expect} from 'chai';
import {rejects} from 'assert';
import {UnauthorizedError} from './error/auth.errors';


describe('JWTAuthorizer', () => {
    describe('#decodeRawToken', () => {
        it('succeeds using a valid token', async () => {
            const authService = Container.get(AuthService);
            const jwtAuthorizer = Container.get(JWTAuthorizer);

            const inputToken: JWTToken = {
                expires: Date.now(),
                email: 'example@email.com'
            };

            const rawToken = await authService.encodeToken(inputToken);
            const outputToken = await jwtAuthorizer.decodeRawToken(rawToken);

            expect(outputToken).to.contain(inputToken);
        });

        it('throws Unauthorized using invalid token', async () => {
            const jwtAuthorizer = Container.get(JWTAuthorizer);

            await rejects(jwtAuthorizer.decodeRawToken('blah'), UnauthorizedError);
        });
    });
});