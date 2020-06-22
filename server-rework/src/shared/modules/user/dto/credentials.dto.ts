import {IsEnum, IsString, MinLength} from 'class-validator';
import {createValidator} from '../../../utils/validations';

export enum SocialAuthType {
    FACEBOOK = 'facebook',
    GOOGLE = 'google'
}

class CredentialsDtoValidations {
    @IsString()
    @MinLength(10)
    token: string;
    @IsEnum(SocialAuthType)
    type: SocialAuthType;
}

type CredentialsDto = CredentialsDtoValidations;
export default CredentialsDto;

export const assertValidCredentialsDto = createValidator(CredentialsDtoValidations);