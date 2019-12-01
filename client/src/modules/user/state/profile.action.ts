import {ProfileData} from './profile.reducer';
import {FacebookAuthResponse} from '../../../shared/auth/facebook/facebook.types';

export enum ProfileActionTypes {
    LOAD_PROFILE = '[Profile] Load',
    LOAD_PROFILE_SUCCESS = '[Profile] Load Success',
    LOAD_PROFILE_FAILURE = '[Profile] Load Failure',

    LOGIN_PROFILE = '[Profile] Login',
    LOGIN_PROFILE_SUCCESS = '[Profile] Login Success',
    LOGIN_PROFILE_FAILURE = '[Profile] Login Failure',

    LOGOUT_PROFILE = '[Profile] Logout',
    LOGOUT_PROFILE_SUCCESS = '[Profile] Logout Success',
    LOGOUT_PROFILE_FAILURE = '[Profile] Logout Failure',
}

export class LoadProfile {
    type: typeof ProfileActionTypes.LOAD_PROFILE = ProfileActionTypes.LOAD_PROFILE;
}

export class LoadProfileSuccess {
    type: typeof ProfileActionTypes.LOAD_PROFILE_SUCCESS = ProfileActionTypes.LOAD_PROFILE_SUCCESS;

    constructor (public payload: ProfileData) {}
}

export class LoadProfileFailure {
    type: typeof ProfileActionTypes.LOAD_PROFILE_FAILURE = ProfileActionTypes.LOAD_PROFILE_FAILURE;
}



export class LoginProfile {
    type: typeof ProfileActionTypes.LOGIN_PROFILE = ProfileActionTypes.LOGIN_PROFILE;

    constructor(public payload: FacebookAuthResponse) {}
}

export class LoginProfileSuccess {
    type: typeof ProfileActionTypes.LOGIN_PROFILE_SUCCESS = ProfileActionTypes.LOGIN_PROFILE_SUCCESS;
}

export class LoginProfileFailure {
    type: typeof ProfileActionTypes.LOGIN_PROFILE_FAILURE = ProfileActionTypes.LOGIN_PROFILE_FAILURE;
}



export class LogoutProfile {
    type: typeof ProfileActionTypes.LOGOUT_PROFILE = ProfileActionTypes.LOGOUT_PROFILE;
}

export class LogoutProfileSuccess {
    type: typeof ProfileActionTypes.LOGOUT_PROFILE_SUCCESS = ProfileActionTypes.LOGOUT_PROFILE_SUCCESS;
}

export class LogoutProfileFailure {
    type: typeof ProfileActionTypes.LOGOUT_PROFILE_FAILURE = ProfileActionTypes.LOGOUT_PROFILE_FAILURE;
}

export type ProfileActions =
    | LoadProfileSuccess
    | LoadProfile
    | LoadProfileFailure
    | LoginProfile
    | LoginProfileFailure
    | LoginProfileSuccess
    | LogoutProfile
    | LogoutProfileFailure
    | LogoutProfileSuccess;
