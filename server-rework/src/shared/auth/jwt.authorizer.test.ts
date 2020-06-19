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
import {JWTConfigurationToken} from '../config/types/jwt.config';
import {Permission} from './permission.enum';
import sinon from 'ts-sinon';
import {UserRepositoryToken} from '../modules/user/repository/user.repository';
import {EntityNotFoundError} from '../repository/error';

describe('JWTAuthorizer', () => {
    const authService = Container.get(AuthService);
    const jwtAuthorizer = Container.get(JWTAuthorizer);
    const jwtConfig = Container.get(JWTConfigurationToken);
    const userRepository = Container.get(UserRepositoryToken);

    describe('#decodeRawToken', () => {
        it('succeeds using a valid token', async () => {
            const inputToken: JWTToken = {
                expires: Date.now() + 9000,
                email: 'example@email.com'
            };

            const rawToken = await authService.encodeToken(inputToken);
            const outputToken = await jwtAuthorizer.decodeRawToken(rawToken);

            expect(outputToken).to.contain(inputToken);
        });

        it('throws Unauthorized using invalid token', async () => {
            await rejects(jwtAuthorizer.decodeRawToken('blah'), UnauthorizedError);
        });

        it('throws Unauthorized on expired token', async () => {
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

    it('#shouldTokenBeRefreshed', () => {
        expect(jwtAuthorizer.shouldTokenBeRefreshed({
            expires: Date.now() - jwtConfig.maxAge,
            email: ''
        })).to.be.true;

        expect(jwtAuthorizer.shouldTokenBeRefreshed({
            expires: Date.now() - 1,
            email: ''
        })).to.be.false;
    });

    describe('#assertPermissions', () => {
        it('asserts correctly subset of 2 permissions', () => {
            const user: User = {
                permissions: [
                    Permission.LOGIN,
                    Permission.READ_LISTED_JOBS,
                    Permission.WRITE_LISTED_JOBS
                ]
            } as any;

            const requiredPermissions: Permission[] = [
                Permission.READ_LISTED_JOBS,
                Permission.WRITE_LISTED_JOBS
            ];

            expect(() => jwtAuthorizer.assertPermissions(user, requiredPermissions)).to.not.throw();
        });

        it('asserts correctly subset of 1 permissions', () => {
            const user: User = {
                permissions: [
                    Permission.LOGIN,
                    Permission.READ_LISTED_JOBS,
                    Permission.WRITE_LISTED_JOBS
                ]
            } as any;

            const requiredPermissions: Permission[] = [
                Permission.READ_LISTED_JOBS
            ];

            expect(() => jwtAuthorizer.assertPermissions(user, requiredPermissions)).to.not.throw();
        });

        it('asserts correctly subset of 0 permissions', () => {
            const user: User = {
                permissions: [
                    Permission.LOGIN,
                    Permission.READ_LISTED_JOBS,
                    Permission.WRITE_LISTED_JOBS
                ]
            } as any;

            const requiredPermissions: Permission[] = [];

            expect(() => jwtAuthorizer.assertPermissions(user, requiredPermissions)).to.not.throw();
        });
    });

    describe('#extractUser', () => {
        const user: User = {
            firstName: 'Test',
            email: 'user@email.com'
        } as any;

        sinon.replace(userRepository, 'findOneByOrFail', async <Key extends keyof User>(field: Key, value: User[Key]) => {
            expect(field).to.equal('email');
            if (value === user.email) {
                return user;
            }

            throw new EntityNotFoundError();
        });

        after(() => {
            sinon.restore();
        });

        it('correctly extracts existing user', async () => {
            const foundUser = await jwtAuthorizer.extractUser({
                expires: Date.now(),
                email: user.email
            });

            expect(foundUser).to.deep.equal(user);
        });

        it('correctly extracts non-existing user', async () => {
            await rejects(jwtAuthorizer.extractUser({
                expires: Date.now(),
                email: 'unknown@who-knows.io'
            }), UnauthorizedError);
        });
    });
});