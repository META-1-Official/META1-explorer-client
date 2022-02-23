import { get, uniq } from 'lodash'
import * as types from './types'

const initialState = {}

const explorerReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case types.UNSET:
      return null
    case types.INITIALIZE:
    default:
      return state
  }
}

export default explorerReducer
