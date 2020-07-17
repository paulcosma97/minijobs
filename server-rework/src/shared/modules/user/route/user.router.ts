import {Service} from 'typedi';
import AbstractExpressRouter from '../../../router/express.router';
import {isAuthenticated} from '../../../auth/authorizer';
import UserService from '../service/user.service';
import CredentialsDto, {assertValidCredentialsDto} from '../dto/credentials.dto';

@Service()
export class UserRouter extends AbstractExpressRouter {
    constructor(private userService: UserService) {
        super('/users');
    }

    getUser = this.get('/profile', isAuthenticated, (_, res) =>
        res.json({
            ...res.locals.user,
            password: undefined
        })
    );

    login = this.post('/login', async (req, res) => {
        const credentials: CredentialsDto = req.body;
        await assertValidCredentialsDto(credentials);
        const user = await this.userService.login(credentials, res);
        res.json(user);
    });

    logout = this.post('/logout', isAuthenticated, (_, res) => {
        this.userService.logout(res);
        res.send();
    });
}
