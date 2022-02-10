import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {ActionTypes} from './actions';

function* fetchTransactions(action) {
  console.log('action: ', action);
  try {
    //  const user = yield call(Api.fetchUser, action.payload.userId);
    yield put({
      type: ActionTypes.FETCH_TRANSACTIONS_REQUEST_SUCCEEDED,
      payload: 'user',
    });
  } catch (e) {
    yield put({
      type: ActionTypes.FETCH_TRANSACTIONS_REQUEST_FAILED,
      message: e.message,
    });
  }
}

function* transactionsSaga() {
  yield takeLatest(ActionTypes.FETCH_TRANSACTIONS, fetchTransactions);
}

export default transactionsSaga;
