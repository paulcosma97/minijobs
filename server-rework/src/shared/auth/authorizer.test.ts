import '../../mocha-runner';
import {isAuthenticated} from './authorizer';
import axios from 'axios';
import {Container} from 'typedi';
import {JWTConfigurationToken} from '../config/types/jwt.config';
import AuthService from './auth.service';
import {ExpressApplicationToken} from '../request/express.interface';
import {UserRepositoryToken} from '../modules/user/repository/user.repository';
import {permissionsOf, Role} from './role.enum';
import User from '../modules/user/model/user.model';
import makeSelfPath from '../utils/make-self-path';
import { expect } from 'chai';
import {rejects} from 'assert';
import ErrorRouteHandler from '../error/error.route-handler';

describe('isAuthenticated', () => {
    const TEST_ROUTE_PATH = '/test/isAuthenticated';
    const jwtConfig = Container.get(JWTConfigurationToken);
    const authService = Container.get(AuthService);
    const app = Container.get(ExpressApplicationToken);
    const userRepository = Container.get(UserRepositoryToken);
    const errorHandler = Container.get(ErrorRouteHandler);

    let user: User;

    before(async () => {
        app.get(TEST_ROUTE_PATH, errorHandler.handleRoute(isAuthenticated), (_, res) => res.json({ ok: true }))
        user = await userRepository.saveOne({
            id: null,
            email: 'user@email.com',
            firstName: 'Test',
            lastName: 'Test',
            permissions: permissionsOf(Role.MEMBER),
            picture: ''
        })
    });

    it('allows authenticated requests', async () => {
        const res = await axios.get(makeSelfPath(TEST_ROUTE_PATH), {
            headers: {
                'Cookie': `${jwtConfig.cookieName}=${await authService.encodeToken({
                    expires: Date.now() + 50000,
                    email: user.email
                })}`
            }
        });

        expect(res.data).to.deep.equal({
            ok: true
        });
    });

    it('disallows unauthenticated requests', async () => {
        await rejects(axios.get(makeSelfPath(TEST_ROUTE_PATH)));
    });

    it('disallows expired tokens', async () => {
        await rejects(axios.get(makeSelfPath(TEST_ROUTE_PATH), {
            headers: {
                'Cookie': `${jwtConfig.cookieName}=${await authService.encodeToken({
                    expires: Date.now() - 1,
                    email: user.email
                })}`
            }
        }));
    });

    it('disallows invalid tokens', async () => {
        await rejects(axios.get(makeSelfPath(TEST_ROUTE_PATH), {
            headers: {
                'Cookie': `${jwtConfig.cookieName}=blablabla`
            }
        }));
    });
})