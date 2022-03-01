import * as types from './types'

const initialState = {}

const explorerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_OPERATIONS:
      return {
        ...state,
        operations: {}
      }
    case types.LAST_OPERATIONS_FETCH:
      return {
        ...state,
        operations: {
          ...state.operations,
          isFetchingLastOperations: true
        }
      }
    case types.LAST_OPERATIONS_FETCH_SUCCESS:
      return {
        ...state,
        operations: {
          ...state.operations,
          op_data: [...(state.operations.op_data ? state.operations.op_data : []), ...action.payload],
          isFetchingLastOperations: false
        }
      }
    case types.LAST_OPERATIONS_FETCH_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          isFetchingLastOperations: false
        }
      }
    case types.HEADER_FETCH:
      return {
        ...state,
        header: {
          ...state.header,
          isFetchingHeader: true
        }
      }
    case types.HEADER_FETCH_SUCCESS:
      return {
        ...state,
        header: {
          ...state.header,
          header_data: action.payload,
          isFetchingHeader: false
        }
      }
    case types.HEADER_FETCH_FAILURE:
      return {
        ...state,
        header: {
          ...state.header,
          message: 'HEADER FETCHING ERROR',
          isFetchingHeader: false
        }
      }
    case types.LAST_BLOCK_NUMBER_FETCH:
      return {
        ...state,
        block: {
          ...state.block,
          isFetchingBlockNumber: true
        }
      }
    case types.LAST_BLOCK_NUMBER_FETCH_SUCCESS:
      return {
        ...state,
        block: {
          ...state.block,
          last_block_number: action.payload,
          isFetchingBlockNumber: false
        }
      }
    case types.LAST_BLOCK_NUMBER_FETCH_FAILURE:
      return {
        ...state,
        block: {
          ...state.block,
          message: 'FETCHING ERROR',
          isFetchingBlockNumber: false
        }
      }
    case types.LOOKUP_ACCOUNTS_FETCH:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          isFetchingLookupAccounts: true
        }
      }
    case types.LOOKUP_ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          lookup_accounts: action.payload,
          isFetchingLookupAccounts: false
        }
      }
    case types.LOOKUP_ACCOUNTS_FETCH_FAILURE:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          message: 'FETCHING ERROR',
          isFetchingLookupAccounts: false
        }
      }
    case types.LOOKUP_ASSETS_FETCH:
      return {
        ...state,
        assets: {
          ...state.assets,
          isFetchingLookupAssets: true
        }
      }
    case types.LOOKUP_ASSETS_FETCH_SUCCESS:
      return {
        ...state,
        assets: {
          ...state.assets,
          lookup_accounts: action.payload,
          isFetchingLookupAssets: false
        }
      }
    case types.LOOKUP_ASSETS_FETCH_FAILURE:
      return {
        ...state,
        assets: {
          ...state.assets,
          message: 'FETCHING ERROR',
          isFetchingLookupAssets: false
        }
      }
      case types.BIG_TRANSACTIONS_FETCH:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          isFetchingBigTransactions: true
        }
      }
    case types.BIG_TRANSACTIONS_FETCH_SUCCESS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          big_transactions: action.payload,
          isFetchingBigTransactions: false
        }
      }
    case types.BIG_TRANSACTIONS_FETCH_FAILURE:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          message: 'FETCHING ERROR',
          isFetchingBigTransactions: false
        }
      }
    case types.UNSET:
      return null
    case types.INITIALIZE:
    default:
      return state
  }
}

export default explorerReducer
