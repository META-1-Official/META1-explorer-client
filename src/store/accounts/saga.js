import {all, takeLatest} from 'redux-saga/effects';

import AccountActionTypes from './actions';
import {generateFetchWorker, takeAllBundler} from '../saga';
import accountsService from '../../services/accounts.services';

export default function* accountsSaga() {
  yield all([
    takeLatest(
      ...takeAllBundler(
        AccountActionTypes.FETCH_ACCOUNTS,
        generateFetchWorker,
        accountsService.fetchAccounts,
      ),
    ),
  ]);
}
