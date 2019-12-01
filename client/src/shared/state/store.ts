import {applyMiddleware, createStore} from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {ProfileState} from '../../modules/user/state/profile.reducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {ListedJobsState} from './reducers/listed-jobs.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/saga';

export interface State {
  profile?: ProfileState;
  listedJobs?: ListedJobsState;
}

const initialState: State = {};

export default function createStoreWithMiddleware() {
  // Define middlewares to include
  const sagaMiddleware = createSagaMiddleware();
  // Add all middlewares into an array
  const middleware = [sagaMiddleware];
  // Create a store with the reducers and middleware
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware)
      // (window as any).__REDUX_DEVTOOLS_EXTENSION__  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  )

  // Run the Redux Saga middleware listeners
  sagaMiddleware.run(rootSaga);

  return store;
}