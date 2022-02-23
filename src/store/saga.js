import { all, call, put, select } from 'redux-saga/effects';

// import commonSaga from './common/saga';
import transactionsSaga from './transactions/saga';
import explorerSaga from './explorer/saga';

const allSagas = [explorerSaga];

export default function* rootSaga() {
    yield all(allSagas.map((saga) => saga()))
}

export const generateFetchWorker = (type, fetch) =>
    function* workerSaga(action) {
        try {
            const response = yield call(fetch, action.payload)
            // dispatch a success action to the store
            yield put({ type: `${type}_SUCCESS`, payload: response.data })
            return response.data
        } catch (error) {
            // dispatch a failure action to the store with the error
            const { response } = error
            error = { ...error.toJSON(), response }
            yield put({ type: `${type}_FAILURE`, error })

            // TODO failing action like authentication fail, etc
            return error
        }
    }

export const takeAllBundler = (type, factory, ...args) => [
    type,
    factory(type, ...args)
]

export { allSagas as all, transactionsSaga }
