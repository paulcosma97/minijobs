import SocialAuthService from './social-auth.base';
import SocialAuthUser from './social-auth-user.model';
import axios from 'axios';
import FacebookProfile from './facebook-profile.dto';

export default class FacebookAuthService implements SocialAuthService {
    async getUser(token: string): Promise<SocialAuthUser> {
        const profile = await axios.get<FacebookProfile>(
            'https://graph.facebook.com/v4.0/me?fields=name,first_name,last_name,picture,email&access_token=' +
                token
        ).then(res => res.data)

        return {
            email: profile.email,
            firstName: profile.first_name,
            lastName: profile.last_name,
            picture: profile.picture.data.url
        }
    }
}