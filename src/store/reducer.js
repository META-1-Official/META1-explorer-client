import {combineReducers} from 'redux';

import commonReducer from './common/reducer';
import transactionsReducer from './transactions/reducer';

export default combineReducers({
  common: commonReducer,
  transactions: transactionsReducer,
});
