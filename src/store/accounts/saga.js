import {call, put, takeLatest} from 'redux-saga/effects';
import {AccountActionTypes} from './actions';

function* fetchAccounts(actions) {
  // try {
  //   const accounts = yield call()
  //   yield put({})
  // } catch (error) {
  // }
}

function* accountsSaga() {
  yield takeLatest(AccountActionTypes.FETCH_ACCOUNTS, fetchAccounts);
}

export default accountsSaga;
