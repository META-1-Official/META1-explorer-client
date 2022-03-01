import {call, put, takeLatest} from 'redux-saga/effects';

import {accountsService} from '../../services';
import {AccountActionTypes} from './actions';

function* fetchAccounts(action) {
  const [accounts, error] = yield call(
    accountsService.fetchAccounts,
    action.payload.start,
    action.payload.limit,
  );

  if (error) {
    yield put({
      type: AccountActionTypes.FETCH_ACCOUNTS_FAILURE,
      payload: error,
    });
  } else {
    yield put({
      type: AccountActionTypes.FETCH_ACCOUNTS_SUCCESS,
      payload: accounts,
    });
  }
}

function* accountsSaga() {
  yield takeLatest(AccountActionTypes.FETCH_ACCOUNTS, fetchAccounts);
}

export default accountsSaga;
