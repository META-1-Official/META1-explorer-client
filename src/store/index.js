import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import recycleState from 'redux-recycle'
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import { loadState, saveState } from './localStorage'

import * as reducers from './reducer';

import rootSaga from './saga';

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

const store = createStore(reducer, window.__PRELOADED_STATE__ || loadState(), composedEnhancers);

const createSaveState = (storeState) => {
  return {}
}

store.subscribe(() => {
  saveState(createSaveState(store.getState()))
})

sagaMiddleware.run(rootSaga);

export default store;