import { combineReducers } from 'redux';
import profileReducer from './profile.reducer';
import listedJobsReducer from './listed-jobs.reducer';

export default combineReducers({
  profile: profileReducer,
  listedJobs: listedJobsReducer
});
