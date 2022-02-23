import {combineReducers} from 'redux';

import commonReducer from './common/reducer';
import transactionsReducer from './transactions/reducer';
import explorerReducer from './explorer/reducer';

export default combineReducers({
  common: commonReducer,
  transactions: transactionsReducer,
  explorer: explorerReducer
});