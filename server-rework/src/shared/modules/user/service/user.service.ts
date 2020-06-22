import {Inject, Service} from 'typedi';
import CredentialsDto from '../dto/credentials.dto';
import User from '../model/user.model';
import SocialAuthFactory from './social-auth/social-auth.factory';
import UserRepository, {UserRepositoryToken} from '../repository/user.repository';
import SocialAuthUser from './social-auth/social-auth-user.model';
import {permissionsOf, Role} from '../../../auth/role.enum';
import { Response } from 'express';
import JWTAuthorizer from '../../../auth/jwt.authorizer';

@Service()
export default class UserService {
    constructor(
        @Inject(UserRepositoryToken) private userRepository: UserRepository,
        private jwtAuthorizer: JWTAuthorizer
    ) {}

    async login(credentials: CredentialsDto, res: Response): Promise<User> {
        const socialAuthFactory = new SocialAuthFactory();
        const socialAuthService = socialAuthFactory.build(credentials.type);
        const socialAuthUser = await socialAuthService.getUser(credentials.token);
        let user = await this.userRepository.findOneBy('email', socialAuthUser.email);

        if (!user) {
            user = await this.createUser(socialAuthUser);
        }

        await this.jwtAuthorizer.setToken(res, user);
        return user;
    }

    private createUser(proto: SocialAuthUser): Promise<User> {
        const user: User = {
            id: null,
            email: proto.email,
            firstName: proto.firstName,
            lastName: proto.lastName,
            picture: proto.picture || '',
            permissions: permissionsOf(Role.MEMBER)
        };

        return this.userRepository.saveOne(user);
    }
}