import '../../main';
import JWTAuthorizer from './jwt.authorizer';
import {Container} from 'typedi';
import AuthService from './auth.service';
import JWTToken from './types/jwt-token.interface';
import {expect} from 'chai';
import {rejects} from 'assert';
import {UnauthorizedError} from './error/auth.errors';
import * as Express from 'express';
import User from '../modules/user/model/user.model';

describe('JWTAuthorizer', () => {
    describe('#decodeRawToken', () => {
        it('succeeds using a valid token', async () => {
            const authService = Container.get(AuthService);
            const jwtAuthorizer = Container.get(JWTAuthorizer);

            const inputToken: JWTToken = {
                expires: Date.now() + 9000,
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

        it('throws Unauthorized on expired token', async () => {
            const authService = Container.get(AuthService);
            const jwtAuthorizer = Container.get(JWTAuthorizer);

            const inputToken: JWTToken = {
                expires: Date.now() - 1,
                email: 'example@email.com'
            };

            const rawToken = await authService.encodeToken(inputToken);
            await rejects(jwtAuthorizer.decodeRawToken(rawToken), UnauthorizedError);
        });
    });

    describe('#setContextUser', () => {
        it('sets user in the context without overriding existing values', () => {
            const jwtAuthorizer = Container.get(JWTAuthorizer);
            const res: Express.Response = {
                locals: {
                    otherValue: true
                }
            } as any;
            const user: User = 'my-user' as any;

            jwtAuthorizer.setContextUser(res, user);

            expect(res.locals).to.deep.equal({
                otherValue: true,
                user: 'my-user'
            });
        });

        it('sets user in the empty context', () => {
            const jwtAuthorizer = Container.get(JWTAuthorizer);
            const res: Express.Response = {
                locals: undefined
            } as any;
            const user: User = 'my-user' as any;

            jwtAuthorizer.setContextUser(res, user);

            expect(res.locals).to.deep.equal({
                user: 'my-user'
            });
        });
    });
});