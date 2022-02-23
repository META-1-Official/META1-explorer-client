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
    takeLatest(
      ...takeAllBundler(
        types.LAST_OPERATIONS_FETCH,
        generateFetchWorker,
        api.fetchLastOperations
      )
    )
  ])
}