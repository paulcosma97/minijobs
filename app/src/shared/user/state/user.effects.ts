import { all, takeEvery, put, call } from "redux-saga/effects";
import {
    LoadUserSuccessAction,
    LoginUserAction,
    LoginUserSuccessAction,
    LogoutUserSuccessAction,
    UserActions
} from "./user.actions";
import User from "../model/user.model";
import userService from "../user.service";

function* loadUserSaga() {
    try {
        const user: User = yield call(() => userService.load());
        yield put({ ...new LoadUserSuccessAction(user) });
    } catch (e) {
        // yield put(loadUserFail());
        console.log('fail load')
    }
}

function* loginUserSaga(action: LoginUserAction) {
    try {
        yield call(() => userService.login());
        yield put({ ...new LoginUserSuccessAction() });
    } catch (e) {
        // yield put(loadUserFail());
        console.log('fail login')

    }
}

function* logoutUserSaga() {
    try {
        yield call(() => userService.logout());
        yield put({ ...new LogoutUserSuccessAction() });
    } catch (e) {
        // yield put(loadUserFail());
        console.log('fail logout')

    }
}

export default function* userEffects () {
    yield all([
        takeEvery(UserActions.LOAD_USER, loadUserSaga),
        takeEvery(UserActions.LOGIN_USER, loginUserSaga),
        takeEvery(UserActions.LOGOUT_USER, logoutUserSaga),
    ])
}