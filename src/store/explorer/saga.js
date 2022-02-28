import {
  all,
  call,
  cancel,
  debounce,
  fork,
  getContext,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import * as types from './types'
import api from '../apis';

import { generateFetchWorker, takeAllBundler } from '../saga'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield all([
    takeLatest(types.LAST_OPERATIONS_FETCH, opWorkerSaga),
    takeLatest(
      ...takeAllBundler(
        types.HEADER_FETCH,
        generateFetchWorker,
        api.fetchHeader
      )
    )
  ])
}

function* opWorkerSaga(action) {
  if (!action.payload.search_after) {
    yield put({
      type: types.CLEAR_OPERATIONS
    })
  }

  try {
    const response = yield call(api.fetchLastOperations, action.payload)
    yield put({ type: types.LAST_OPERATIONS_FETCH_SUCCESS, payload: response.data })
    return response.data
  } catch (error) {
    const { response } = error
    error = { ...error.toJSON(), response }
    yield put({ type: types.LAST_OPERATIONS_FETCH_FAILURE, error })
    return error
  }
}