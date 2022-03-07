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
    ),
    takeLatest(
      ...takeAllBundler(
        types.LAST_BLOCK_NUMBER_FETCH,
        generateFetchWorker,
        api.fetchLastBlockNumber
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.LOOKUP_ACCOUNTS_FETCH,
        generateFetchWorker,
        api.fetchLookupAccounts
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.LOOKUP_ASSETS_FETCH,
        generateFetchWorker,
        api.fetchLookupAssets
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.BIG_BLOCKS_FETCH,
        generateFetchWorker,
        api.fetchBigBlocks
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.BIG_TRANSACTIONS_FETCH,
        generateFetchWorker,
        api.fetchBigTransactions
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.ACTIVE_ASSETS_FETCH,
        generateFetchWorker,
        api.fetchActiveAssets
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.DEX_VOLUME_FETCH,
        generateFetchWorker,
        api.fetchDexVolume
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.DAILY_DEX_CHART_FETCH,
        generateFetchWorker,
        api.fetchDailyDEXChart
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.ACTIVE_MARKETS_FETCH,
        generateFetchWorker,
        api.fetchActiveMarkets
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.FEES_FETCH,
        generateFetchWorker,
        api.fetchFees
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.COMMITTEE_MEMBERS_FETCH,
        generateFetchWorker,
        api.fetchCommitteeMembers
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.WITNESSES_FETCH,
        generateFetchWorker,
        api.fetchWitnesses
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