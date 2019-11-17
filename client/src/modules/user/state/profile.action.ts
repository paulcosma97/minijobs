import smartFetch from '../../../shared/utils/smart-fetch';
import {ProfileData} from './profile.reducer';
import {ActionDispatcher} from '../../../shared/state/actions';
import {FacebookAuthResponse} from '../../../shared/auth/facebook/facebook.types';

export const LOAD_PROFILE = '[Profile] Load';
export const LOAD_PROFILE_SUCCESS = '[Profile] Load Success';
export const LOGIN_PROFILE = '[Profile] Login';
export const LOGOUT_PROFILE = '[Profile] Logout';

interface LoadProfileAction {
    type: typeof LOAD_PROFILE;
}

interface LoadSuccessProfileAction {
    type: typeof LOAD_PROFILE_SUCCESS;
    payload: ProfileData;
}

interface LoginProfileAction {
    type: typeof LOGIN_PROFILE;
    payload: ProfileData;
}

interface LogoutProfileAction {
    type: typeof LOGOUT_PROFILE;
}

export const loadProfile = () => async (dispatch: ActionDispatcher) => {
    dispatch({
        type: LOAD_PROFILE,
    });

    const profile = await smartFetch
        .get<ProfileData>('/profile')
        .catch(() => null);

    dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: profile
    });
};

export const loginProfile = (fbResponse: FacebookAuthResponse) => (
    dispatch: ActionDispatcher
) => {
    smartFetch
        .post('/auth', {accessToken: fbResponse.tokenDetail.accessToken})
        .then(() => dispatch(loadProfile()));
};

export const logoutProfile = () => (dispatch: ActionDispatcher) => {
    smartFetch
        .post('/logout')
        .catch(() => null)
        .then(() =>
            dispatch({
                type: LOGOUT_PROFILE
            })
        );
};

export type ProfileActions =
    | LoadProfileAction
    | LoadSuccessProfileAction
    | LoginProfileAction
    | LogoutProfileAction;
