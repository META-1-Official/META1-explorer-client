import {combineReducers} from 'redux';

import commonReducer from './common/reducer';
import accountsReducer from './accounts/reducer';
import transactionsReducer from './transactions/reducer';

export default combineReducers({
  common: commonReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
});
