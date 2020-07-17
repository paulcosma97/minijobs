import axios from 'axios';
import {Plugins} from "@capacitor/core";
import {isWebPlatform} from "../utils/platform";
import User from './model/user.model';

declare const FB: any;

class UserService {

    public async load() {
        try {
            return await axios.get<User>('http://localhost:3000/users/profile').then(response => response.data);
        } catch (e) {
            console.error(e);
            throw new Error('Could not load user.');
        }
    }

    public async logout() {
        try {
            return await axios.post('http://localhost:3000/users/logout');
        } catch (e) {
            console.error(e);
            throw new Error('Could not log user out.');
        }
    }

    public async login() {
        const token = await (isWebPlatform() ? this.fetchWebFacebookAccessToken() : this.fetchNativeFacebookAccessToken()).catch(e => {
            console.error(e);
            throw new Error('Could not fetch Facebook access token.');
        });

        try {
            await axios.post('http://localhost:3000/users/login', {
                type: 'facebook',
                token
            });
        } catch (e) {
            console.error(e);
            throw new Error('Could not login using Facebook access token.');
        }

    }

    private fetchWebFacebookAccessToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            FB.login(function(response: any) {
                if (response.authResponse) {
                    resolve(response.authResponse.accessToken)
                } else {
                    reject();
                }
            });
        });
    }

    private async fetchNativeFacebookAccessToken(): Promise<string> {
        const result = await Plugins.FacebookLogin.login({ permissions: ['public_profile', 'email'] });
        if (result && result.accessToken) {
            return result.accessToken.token;
        }

        throw new Error();
    }
}

const userService = new UserService();
export default userService;