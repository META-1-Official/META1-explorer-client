import * as types from './types'

// last operations
export const fetchLastOperations = (search_after) => ({
  type: types.LAST_OPERATIONS_FETCH,
  payload: {
    search_after
  }
})

// clear operations
export const clearOperations = () => (
  {
    type: types.CLEAR_OPERATIONS
  }
)

// operation header
export const fetchHeader = () => ({
  type: types.HEADER_FETCH,
  payload: {}
})

// last bolck number
export const fetchLastBlockNumber = () => ({
  type: types.LAST_BLOCK_NUMBER_FETCH,
  payload: {}
})

// lookup assets
export const fetchLookupAssets = (start) => ({
  type: types.LOOKUP_ASSETS_FETCH,
  payload: {start}
})

// lookup accounts
export const fetchLookupAccounts = (start) => ({
  type: types.LOOKUP_ACCOUNTS_FETCH,
  payload: {start}
})

// big blocks
export const fetchBigBlocks = () => ({
  type: types.BIG_BLOCKS_FETCH,
  payload: {}
})

// big transactions
export const fetchBigTransactions = () => ({
  type: types.BIG_TRANSACTIONS_FETCH,
  payload: {}
})

// transaction metadata
export const fetchTransaction = (trx) => ({
  type: types.TRANSACTION_FETCH,
  payload: {trx}
})

// active assets
export const fetchActiveAssets = () => ({
  type: types.ACTIVE_ASSETS_FETCH,
  payload: {}
})

// dex volume
export const fetchDexVolume = () => ({
  type: types.DEX_VOLUME_FETCH,
  payload: {}
})

// daily dex chart
export const fetchDailyDexChart = () => ({
  type: types.DAILY_DEX_CHART_FETCH,
  payload: {}
})

// most active markets
export const fetchActiveMarkets = () => ({
  type: types.ACTIVE_MARKETS_FETCH,
  payload: {}
})

// fees
export const fetchFees = () => ({
  type: types.FEES_FETCH,
  payload: {}
})

// committee
export const fetchCommittee = () => ({
  type: types.COMMITTEE_MEMBERS_FETCH,
  payload: {}
})

// witness
export const fetchWitnesses = () => ({
  type: types.WITNESSES_FETCH,
  payload: {}
})