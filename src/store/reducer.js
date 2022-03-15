import explorer from './explorer/reducer';
import accountsReducer from './accounts/reducer';

const reducer = {
  explorer,
  accounts: accountsReducer,
};

export default reducer;
