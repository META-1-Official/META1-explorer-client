import AccountActionTypes from './actions';

const initialState = {
  accounts: [],
  error: {},
  isFetchingAccounts: false,
};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountActionTypes.FETCH_ACCOUNTS_SUCCESS:
      return {...state, accounts: action.payload, isFetchingAccounts: false};
    case AccountActionTypes.FETCH_ACCOUNTS_FAILURE:
      return {...state, error: action.payload, isFetchingAccounts: false};
    case AccountActionTypes.SET_IS_FETCHING_ACCOUNTS:
      return {...state, isFetchingAccounts: action.payload};
    default:
      return state;
  }
};

export default accountsReducer;
