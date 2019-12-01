import 'regenerator-runtime/runtime';

import { watchLoadListedJobs } from './listed-jobs.saga';
import { watchLoadProfile, watchLoginProfile, watchLogoutProfile } from '../../../modules/user/state/profile.saga';
import { all } from '@redux-saga/core/effects';

// Root sagas
// Single entry point to start all sagas at once
export default function* rootSaga() {
  yield all([
        watchLoadListedJobs(),
    
        watchLoadProfile(),
        watchLoginProfile(),
        watchLogoutProfile()
    ]);
}
