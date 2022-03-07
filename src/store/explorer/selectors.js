import get from 'lodash/get';

// last operations
export const getOperations = (state) => get(state, ['explorer', 'operations', 'op_data']);
export const isFetchingLastOperations = (state) => get(state, ['explorer', 'operations', 'isFetchingLastOperations']);

// header
export const getHeader = (state) => get(state, ['explorer', 'header', 'header_data']);
export const isFetchingHeader = (state) => get(state, ['explorer', 'header', 'isFetchingHeader']);

// last blocks
export const getLastBlockNumber = (state) => get(state, ['explorer', 'blocks', 'last_block_number']);
export const isFetchingLastBlockNumber = (state) => get(state, ['explorer', 'blocks', 'isFetchingLastBlockNumber']);

// lookup assets
export const getLookupAssets = (state) => get(state, ['explorer', 'assets', 'lookup_assets']);
export const isFetchingLookupAssets = (state) => get(state, ['explorer', 'assets', 'isFetchingLookupAssets']);

// accounts
export const getLookupAccounts = (state) => get(state, ['explorer', 'accounts', 'lookup_accounts']);
export const isFetchingLookupAccounts = (state) => get(state, ['explorer', 'accounts', 'isFetchingLookupAccounts']);

// big blocks
export const getBigBlocks = (state) => get(state, ['explorer', 'blocks', 'big_blocks']);
export const isFetchingBigBlocks = (state) => get(state, ['explorer', 'blocks', 'isFetchingBigBlocks']);

// big transactions
export const getBigTransactions = (state) => get(state, ['explorer', 'transactions', 'big_transactions']);
export const isFetchingBigTransactions = (state) => get(state, ['explorer', 'transactions', 'isFetchingBigTransactions']);

// active assets
export const getActiveAssets = (state) => get(state, ['explorer', 'assets', 'active_assets']);
export const isFetchingActiveAssets = (state) => get(state, ['explorer', 'assets', 'isFetchingActiveAssets']);

// dex volumes
export const getDexVolume = (state) => get(state, ['explorer', 'dex', 'dex_volume']);
export const isFetchingDexVolume = (state) => get(state, ['explorer', 'dex', 'isFetchingDexVolume']);

// daily dex chart
export const getDailyDexChart = (state) => get(state, ['explorer', 'dex', 'daily_dex_chart']);
export const isFetchingDailyDexChart = (state) => get(state, ['explorer', 'dex', 'isFetchingDailyDexChart']);

// active markets
export const getActiveMarkets = (state) => get(state, ['explorer', 'markets', 'active_markets']);
export const isFetchingActiveMarkets = (state) => get(state, ['explorer', 'markets', 'isFetchingActiveMarkets']);

// fees
export const getFees = (state) => get(state, ['explorer', 'fees', 'fees']);
export const isFetchingFees = (state) => get(state, ['explorer', 'fees', 'isFetchingFees']);

// committee members
export const getCommittee = (state) => get(state, ['explorer', 'committee', 'members']);
export const isFetchingCommittee = (state) => get(state, ['explorer', 'committee', 'isFetchingCommittee']);

// witness
export const getWitnesses = (state) => get(state, ['explorer', 'witnesses', 'witnesses']);
export const isFetchingWitnesses = (state) => get(state, ['explorer', 'witnesses', 'isFetchingWitnesses']);