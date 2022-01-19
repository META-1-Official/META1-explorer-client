import {ActionTypes} from './actions';

const initialState = {
  transactions: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TRANSACTIONS_REQUEST:
      return {...state, isLoading: true};
    default:
      return state;
  }
};

export default reducer;
