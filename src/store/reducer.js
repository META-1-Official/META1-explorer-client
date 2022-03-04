import common from './common/reducer';
import explorer from './explorer/reducer';
import accountsReducer from './accounts/reducer';

const reducer = {
  common,
  explorer,
  accounts: accountsReducer,
};

export default reducer;
