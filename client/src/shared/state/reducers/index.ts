import {combineReducers} from 'redux';
import profileReducer from '../../../modules/user/state/profile.reducer';
import listedJobsReducer from './listed-jobs.reducer';

export default combineReducers({
  profile: profileReducer,
  listedJobs: listedJobsReducer
});
