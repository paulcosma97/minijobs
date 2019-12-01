import { takeEvery, call, put } from "@redux-saga/core/effects";
import { ProfileActionTypes, LoadProfileFailure, LoadProfileSuccess, LoginProfileSuccess, LoadProfile, LogoutProfileSuccess, LogoutProfileFailure, LoginProfile } from "./profile.action";
import smartFetch from "../../../shared/utils/smart-fetch";
import { ProfileData } from "./profile.reducer";

export function* watchLoadProfile() {
    yield takeEvery(ProfileActionTypes.LOAD_PROFILE, function* () {
        try {
            const profile: ProfileData = yield call(() => smartFetch.get<ProfileData>('/profile'));
            yield put({ ...new LoadProfileSuccess(profile) });

        } catch (e) {
            yield put({ ...new LoadProfileFailure() });
        }
    });
}

export function* watchLoginProfile() {
    yield takeEvery<LoginProfile>(ProfileActionTypes.LOGIN_PROFILE, function* ({ payload }) {
        try {
            yield call(() => smartFetch.post('/auth', {accessToken: payload.tokenDetail.accessToken}));

            yield put({ ...new LoginProfileSuccess() });
            yield put({ ...new LoadProfile() });

        } catch (e) {
            yield put({ ...new LoadProfileFailure() });
        }
    });
}

export function* watchLogoutProfile() {
    yield takeEvery(ProfileActionTypes.LOGOUT_PROFILE, function* () {
        try {
            yield call(() => smartFetch.post('/logout'));

            yield put({ ...new LogoutProfileSuccess() });
        } catch (e) {
            yield put({ ...new LogoutProfileFailure() });
        }
    });
}