import SocialAuthService from './social-auth.base';
import SocialAuthUser from './social-auth-user.model';

export default class GoogleAuthService implements SocialAuthService {
    getUser(token: string): Promise<SocialAuthUser> {
        throw new Error();
    }
}