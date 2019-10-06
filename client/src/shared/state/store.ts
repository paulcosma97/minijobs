import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { ProfileState } from './reducers/profile.reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { ListedJobsState } from './reducers/listed-jobs.reducer';

export interface State {
  profile?: ProfileState;
  listedJobs?: ListedJobsState;
}

const initialState: State = {};
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // (window as any).__REDUX_DEVTOOLS_EXTENSION__  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);
