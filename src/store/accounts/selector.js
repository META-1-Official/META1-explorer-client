import get from 'lodash/get';

export const accountsSelector = (state) => get(state, ['accounts', 'accounts']);
export const accountsFetchingStatusSelector = (state) =>
  get(state, ['accounts', 'isFetchingAccounts']);
