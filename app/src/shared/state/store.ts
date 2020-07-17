import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

// then run the saga
sagaMiddleware.run(rootSaga);