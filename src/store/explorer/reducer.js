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
    case types.UNSET:
      return null
    case types.INITIALIZE:
    default:
      return state
  }
}

export default explorerReducer
