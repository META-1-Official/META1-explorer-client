import {combineReducers} from 'redux';

import transactionsReducer from './transactions/reducer';

export default combineReducers({
  transactions: transactionsReducer,
});
