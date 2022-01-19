import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';

import * as reducers from './reducer';

import {transactionsSaga} from './saga';

const initialState = {};
const enhancers = [];

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const middleware = [sagaMiddleware, logger];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const reducer = combineReducers({...reducers});

const store = createStore(reducer, initialState, composedEnhancers);

sagaMiddleware.run(transactionsSaga);

export default store;
