import SocialAuthUser from './social-auth-user.model';

export default interface SocialAuthService {
    getUser(token: string): Promise<SocialAuthUser>;
}