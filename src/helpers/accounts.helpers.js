import {localizeNumber} from './utility';

export const mapAccounts = (accounts) => {
  return accounts.map((account) => ({
    ...account,
    amount: localizeNumber(account.amount),
  }));
};
