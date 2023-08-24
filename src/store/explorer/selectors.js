import get from 'lodash/get';

// last operations
export const getOperations = (state) =>
  get(state, ['explorer', 'operations', 'op_data']);
export const isFetchingLastOperations = (state) =>
  get(state, ['explorer', 'operations', 'isFetchingLastOperations']);

// header
export const getHeader = (state) =>
  get(state, ['explorer', 'header', 'header_data']);
export const isFetchingHeader = (state) =>
  get(state, ['explorer', 'header', 'isFetchingHeader']);

// last blocks
export const getLastBlockNumber = (state) =>
  get(state, ['explorer', 'blocks', 'last_block_number']);
export const isFetchingLastBlockNumber = (state) =>
  get(state, ['explorer', 'blocks', 'isFetchingLastBlockNumber']);

// lookup assets
export const getLookupAssets = (state) =>
  get(state, ['explorer', 'assets', 'lookup_assets']);
export const isFetchingLookupAssets = (state) =>
  get(state, ['explorer', 'assets', 'isFetchingLookupAssets']);

// accounts
export const getLookupAccounts = (state) =>
  get(state, ['explorer', 'accounts', 'lookup_accounts']);
export const isFetchingLookupAccounts = (state) =>
  get(state, ['explorer', 'accounts', 'isFetchingLookupAccounts']);

// big blocks
export const getBigBlocks = (state) =>
  get(state, ['explorer', 'blocks', 'big_blocks']);
export const isFetchingBigBlocks = (state) =>
  get(state, ['explorer', 'blocks', 'isFetchingBigBlocks']);

// big transactions
export const getBigTransactions = (state) =>
  get(state, ['explorer', 'transactions', 'big_transactions']);
export const isFetchingBigTransactions = (state) =>
  get(state, ['explorer', 'transactions', 'isFetchingBigTransactions']);

// transaction metadata
export const getTransaction = (state) =>
  get(state, ['explorer', 'transactions', 'transaction']);
export const isFetchingTransaction = (state) =>
  get(state, ['explorer', 'transactions', 'isFetchingTransaction']);

// active assets
export const getActiveAssets = (state) =>
  get(state, ['explorer', 'assets', 'active_assets']);
export const isFetchingActiveAssets = (state) =>
  get(state, ['explorer', 'assets', 'isFetchingActiveAssets']);

// dex volumes
export const getDexVolume = (state) =>
  get(state, ['explorer', 'dex', 'dex_volume']);
export const isFetchingDexVolume = (state) =>
  get(state, ['explorer', 'dex', 'isFetchingDexVolume']);

// daily dex chart
export const getDailyDexChart = (state) =>
  get(state, ['explorer', 'dex', 'daily_dex_chart']);
export const isFetchingDailyDexChart = (state) =>
  get(state, ['explorer', 'dex', 'isFetchingDailyDexChart']);

// full detail of the asset
export const getAssetFull = (state) =>
  get(state, ['explorer', 'assets', 'asset_full']);
export const isFetchingAssetFull = (state) =>
  get(state, ['explorer', 'assets', 'isFetchingAssetFull']);

// asset holders
export const getAssetHolders = (state) =>
  get(state, ['explorer', 'assets', 'asset_holders']);
export const isFetchingAssetHolders = (state) =>
  get(state, ['explorer', 'assets', 'isFetchingAssetHolders']);

// asset holders count
export const getAssetHoldersCount = (state) =>
  get(state, ['explorer', 'assets', 'asset_holders_count']);
export const isFetchingAssetHoldersCount = (state) =>
  get(state, ['explorer', 'assets', 'isFetchingAssetHoldersCount']);

// asset markets
export const getAssetMarkets = (state) =>
  get(state, ['explorer', 'markets', 'asset_markets']);
export const isFetchingAssetMarkets = (state) =>
  get(state, ['explorer', 'markets', 'isFetchingAssetMarkets']);

// active markets
export const getActiveMarkets = (state) =>
  get(state, ['explorer', 'markets', 'active_markets']);
export const isFetchingActiveMarkets = (state) =>
  get(state, ['explorer', 'markets', 'isFetchingActiveMarkets']);

// market ticker
export const getTicker = (state) =>
  get(state, ['explorer', 'markets', 'ticker']);
export const isFetchingTicker = (state) =>
  get(state, ['explorer', 'markets', 'isFetchingTicker']);

// fees
export const getFees = (state) => get(state, ['explorer', 'fees', 'fees']);
export const isFetchingFees = (state) =>
  get(state, ['explorer', 'fees', 'isFetchingFees']);

// committee members
export const getCommittee = (state) =>
  get(state, ['explorer', 'committee', 'members']);
export const isFetchingCommittee = (state) =>
  get(state, ['explorer', 'committee', 'isFetchingCommittee']);

// witness
export const getWitnesses = (state) =>
  get(state, ['explorer', 'witnesses', 'witnesses']);
export const isFetchingWitnesses = (state) =>
  get(state, ['explorer', 'witnesses', 'isFetchingWitnesses']);

// account history
export const getAccountHistory = (state) =>
  get(state, ['explorer', 'accountHistory', 'data']);
export const getAccountHistoryCount = (state) =>
  get(state, ['explorer', 'accountHistory', 'count']);
export const isFetchingAccountHistory = (state) =>
  get(state, ['explorer', 'accountHistory', 'isFetchingAccountHistory']);

// lookup transactions
export const getLookupTransactions = (state) =>
  get(state, ['explorer', 'transactions', 'lookupTransactions']);

// pie data
export const getPieData = (state) => get(state, ['explorer', 'pie', 'data']);

export const getMeta1Volumes = (state, period) => {
  const total = state.explorer.header?.header_data?.[
    `meta1_volume_${period}_history`
  ]?.length
    ? state.explorer.header?.header_data?.[
        `meta1_volume_${period}_history`
      ]?.reduce((sum, acc) => {
        return (acc += sum);
      }, 0)
    : 0;

  const chart = state.explorer.header?.header_data?.[
    `meta1_volume_${period}_history`
  ]?.length
    ? state.explorer.header?.header_data?.[`meta1_volume_${period}_history`]
    : [];

  return { total, chart };
};

export const getSystemAccountsBalance = (state) =>
  get(state, ['explorer', 'systemAccountsBalance']);
