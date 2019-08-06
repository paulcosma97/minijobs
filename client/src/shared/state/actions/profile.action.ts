import smartFetch from '../../utils/smart-fetch';
import { ProfileData } from '../reducers/profile.reducer';
import { ActionDispatcher } from '../actions';
import { FacebookAuthResponse } from '../../auth/facebook/facebook.types';

export const LOAD_PROFILE = '[Profile] Load';
export const LOGIN_PROFILE = '[Profile] Login';
export const LOGOUT_PROFILE = '[Profile] Logout';

interface LoadProfileAction {
  type: typeof LOAD_PROFILE;
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
  const profile = await smartFetch
    .get<ProfileData>('/profile')
    .catch(() => null);

  dispatch({
    type: LOAD_PROFILE,
    payload: profile
  });
};

export const loginProfile = (fbResponse: FacebookAuthResponse) => (
  dispatch: ActionDispatcher
) => {
  smartFetch
    .post('/auth', { accessToken: fbResponse.tokenDetail.accessToken })
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
  | LoginProfileAction
  | LogoutProfileAction;
