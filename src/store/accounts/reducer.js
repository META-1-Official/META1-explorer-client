import {AccountActionTypes} from './actions';

const initialState = {
  accounts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountActionTypes.FETCH_ACCOUNTS_SUCCESS:
      return {...state, accounts: action.payload};
    default:
      return state;
  }
};

export default reducer;
