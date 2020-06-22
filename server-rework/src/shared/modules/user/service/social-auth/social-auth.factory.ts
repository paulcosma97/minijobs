import SocialAuthService from './social-auth.base';
import {SocialAuthType} from '../../dto/credentials.dto';
import FacebookAuthService from './facebook.auth';
import GoogleAuthService from './google.auth';
import {GenericServerError} from '../../../../utils/error';

export default class SocialAuthFactory {
    build(type: SocialAuthType): SocialAuthService {
        switch (type) {
        case SocialAuthType.FACEBOOK:
            return new FacebookAuthService();
        case SocialAuthType.GOOGLE:
            return new GoogleAuthService();
        default:
            throw new GenericServerError('Unknown social auth type: ' + type);
        }
    }
}