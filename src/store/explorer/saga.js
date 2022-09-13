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
  takeLatest,
} from 'redux-saga/effects';
import * as types from './types';
import api from '../apis';
import accountsService from '../../services/accounts.services';

import { generateFetchWorker, takeAllBundler } from '../saga';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield all([
    takeLatest(types.LAST_OPERATIONS_FETCH, opWorkerSaga),
    takeLatest(
      ...takeAllBundler(
        types.HEADER_FETCH,
        generateFetchWorker,
        api.fetchHeader,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.LAST_BLOCK_NUMBER_FETCH,
        generateFetchWorker,
        api.fetchLastBlockNumber,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.LOOKUP_ACCOUNTS_FETCH,
        generateFetchWorker,
        api.fetchLookupAccounts,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.LOOKUP_ASSETS_FETCH,
        generateFetchWorker,
        api.fetchLookupAssets,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.BIG_BLOCKS_FETCH,
        generateFetchWorker,
        api.fetchBigBlocks,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.BIG_TRANSACTIONS_FETCH,
        generateFetchWorker,
        api.fetchBigTransactions,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.TRANSACTION_FETCH,
        generateFetchWorker,
        api.fetchTransaction,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.ACTIVE_ASSETS_FETCH,
        generateFetchWorker,
        api.fetchActiveAssets,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.ASSET_FULL_FETCH,
        generateFetchWorker,
        api.fetchAssetFull,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.ASSET_HOLDERS_FETCH,
        generateFetchWorker,
        api.fetchAssetHolders,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.ASSET_HOLDERS_COUNT_FETCH,
        generateFetchWorker,
        api.fetchAssetHoldersCount,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.DEX_VOLUME_FETCH,
        generateFetchWorker,
        api.fetchDexVolume,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.DAILY_DEX_CHART_FETCH,
        generateFetchWorker,
        api.fetchDailyDEXChart,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.ASSET_MARKETS_FETCH,
        generateFetchWorker,
        api.fetchAssetMarkets,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.ACTIVE_MARKETS_FETCH,
        generateFetchWorker,
        api.fetchActiveMarkets,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.TICKER_FETCH,
        generateFetchWorker,
        api.fetchTicker,
      ),
    ),
    takeLatest(
      ...takeAllBundler(types.FEES_FETCH, generateFetchWorker, api.fetchFees),
    ),
    takeLatest(
      ...takeAllBundler(
        types.COMMITTEE_MEMBERS_FETCH,
        generateFetchWorker,
        api.fetchCommitteeMembers,
      ),
    ),
    takeLatest(
      ...takeAllBundler(
        types.WITNESSES_FETCH,
        generateFetchWorker,
        api.fetchWitnesses,
      ),
    ),
    takeLatest(types.ACCOUNT_HISTORY_FETCH, getHistory),
    takeLatest(types.LOOKUP_TRANSACTIONS_FETCH, getLookupTransactions),
  ]);
}

function* opWorkerSaga(action) {
  if (!action.payload.search_after) {
    yield put({
      type: types.CLEAR_OPERATIONS,
    });
  }

  try {
    const response = yield call(api.fetchLastOperations, action.payload);
    yield put({
      type: types.LAST_OPERATIONS_FETCH_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const { response } = error;
    // eslint-disable-next-line no-ex-assign
    error = { ...error.toJSON(), response };
    yield put({ type: types.LAST_OPERATIONS_FETCH_FAILURE, error });
    return error;
  }
}

function* getHistory(action) {
  const { accountId, from, search_after, object_ids, size } = action.payload;
  const response = yield call(
    accountsService.getAccountHistoryData,
    accountId,
    from,
    search_after,
    object_ids,
    size,
  );
  yield put({
    type: types.ACCOUNT_HISTORY_FETCH_SUCCESS,
    payload: response,
  });
}

function* getLookupTransactions(action) {
  const { start } = action.payload;
  const response = yield call(api.getLookupTransactions, start);
  yield put({
    type: types.LOOKUP_TRANSACTIONS_FETCH_SUCCESS,
    payload: response.data,
  });
}
