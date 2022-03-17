import {all, takeLatest} from 'redux-saga/effects';

import AccountActionTypes from './actions';
import {generateFetchWorker, takeAllBundler} from '../saga';
import api from '../apis';

export default function* accountsSaga() {
  yield all([
    takeLatest(
      ...takeAllBundler(
        AccountActionTypes.FETCH_ACCOUNTS,
        generateFetchWorker,
        api.fetchAccounts,
      ),
    ),
  ]);
}
