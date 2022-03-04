import {all, call, put} from 'redux-saga/effects';

import explorerSaga from './explorer/saga';
import accountsSaga from './accounts/saga';

const allSagas = [explorerSaga, accountsSaga];

export default function* rootSaga() {
  yield all(allSagas.map((saga) => saga()));
}

export const generateFetchWorker = (type, fetch) =>
  function* workerSaga(action) {
    try {
      const response = yield call(fetch, action.payload);
      yield put({type: `${type}_SUCCESS`, payload: response.data});
      return response.data;
    } catch (error) {
      const errorData = {...error.toJSON(), response: error.response};
      yield put({type: `${type}_FAILURE`, error: errorData});
      // TODO failing action like authentication fail, etc
      return error;
    }
  };

export const takeAllBundler = (type, factory, ...args) => [
  type,
  factory(type, ...args),
];

export {allSagas as all};
