import { all } from 'redux-saga/effects';
import userEffects from "../user/state/user.effects";

export default function* rootSaga() {
    yield all([
        userEffects()
    ]);
}