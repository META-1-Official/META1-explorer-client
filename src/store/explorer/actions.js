import * as types from './types'

export const fetchLastOperations = (search_after) => ({
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

export const fetchHeader = () => ({
  type: types.HEADER_FETCH,
  payload: {}
})

export const fetchLastBlockNumber = () => ({
  type: types.LAST_BLOCK_NUMBER_FETCH,
  payload: {}
})

export const fetchLookupAssets = (start) => ({
  type: types.LOOKUP_ASSETS_FETCH,
  payload: {start}
})

export const fetchLookupAccounts = (start) => ({
  type: types.LOOKUP_ACCOUNTS_FETCH,
  payload: {start}
})