import {put, takeEvery} from 'redux-saga/effects';

import {ActionTypes as CommonActionTypes} from './actions';
import {AccountActionTypes} from '../accounts/actions';

function* startAPIRequest() {
  yield put({
    type: CommonActionTypes.SET_IS_LOADING,
    payload: true,
  });
}

function* stopAPIRequest() {
  yield put({
    type: CommonActionTypes.SET_IS_LOADING,
    payload: false,
  });
}

function* commonSaga() {
  yield takeEvery(AccountActionTypes.FETCH_ACCOUNTS, startAPIRequest);

  yield takeEvery(AccountActionTypes.FETCH_ACCOUNTS_SUCCESS, stopAPIRequest);
  yield takeEvery(AccountActionTypes.FETCH_ACCOUNTS_FAILURE, stopAPIRequest);
}

export default commonSaga;
