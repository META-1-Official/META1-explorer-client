import get from 'lodash/get';

export const getOperations = (state) => get(state, ['explorer', 'operations', 'op_data']);
export const isFetchingLastOperations = (state) => get(state, ['explorer', 'operations', 'isFetchingLastOperations']);
export const getHeader = (state) => get(state, ['explorer', 'header', 'header_data']);
export const isFetchingHeader = (state) => get(state, ['explorer', 'header', 'isFetchingHeader']);
export const getLastBlockNumber = (state) => get(state, ['explorer', 'block', 'last_block_number']);
export const isFetchingLastBlockNumber = (state) => get(state, ['explorer', 'block', 'isFetchingLastBlockNumber']);
export const getLookupAssets = (state) => get(state, ['explorer', 'assets', 'lookup_assets']);
export const isFetchingLookupAssets = (state) => get(state, ['explorer', 'assets', 'isFetchingLookupAssets']);
export const getLookupAccounts = (state) => get(state, ['explorer', 'accounts', 'lookup_accounts']);
export const isFetchingLookupAccounts = (state) => get(state, ['explorer', 'accounts', 'isFetchingLookupAccounts']);