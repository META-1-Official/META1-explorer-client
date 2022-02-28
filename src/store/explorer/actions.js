import * as types from './types'

export const getLastOperations = (search_after) => ({
  type: types.LAST_OPERATIONS_FETCH,
  payload: {
    search_after
  }
})

export const clearOperations = () => (
  {
    type: types.CLEAR_OPERATIONS
  }
)

export const getHeader = () => ({
  type: types.HEADER_FETCH,
  payload: {}
})