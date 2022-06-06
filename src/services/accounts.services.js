import api from '../store/apis';
import { formatBalance } from '../helpers/utility';

const getAccountFullData = async (fullAccount) => {
  let cashback_balance_id = '';
  let cashback_balance_balance = 0;
  if (
    fullAccount.cashback_balance !== undefined &&
    Object.keys(fullAccount.cashback_balance).length > 0
  ) {
    cashback_balance_id = fullAccount.cashback_balance.id;
    cashback_balance_balance = fullAccount.cashback_balance.balance.amount;
  }

  let lifetime = 'free member';
  if (fullAccount.account.id === fullAccount.account.lifetime_referrer) {
    lifetime = 'lifetime member';
  }

  let vesting_balances = await api.parseVesting(fullAccount.vesting_balances);
  const lifetime_fees_paid = fullAccount.statistics.lifetime_fees_paid;
  const bts_balance = fullAccount.balances[0].balance;
  const total_ops = await api.getTotalAccountOps(fullAccount.account.id);
  const vote_acc_name = await api.getAccountName(
    fullAccount.account.options.voting_account,
  );

  const retVal = {
    name: fullAccount.account.name,
    id: fullAccount.account.id,
    referer: fullAccount.referrer_name,
    registrar: fullAccount.registrar_name,
    statistics: fullAccount.account.statistics,
    cashback: cashback_balance_id,
    cashback_balance: formatBalance(cashback_balance_balance, 5),
    lifetime: lifetime,
    total_ops: total_ops?.data,
    lifetime_fees_paid: parseInt(formatBalance(lifetime_fees_paid, 5)),
    bts_balance: parseInt(formatBalance(bts_balance, 5)),
    vesting: vesting_balances?.data,
    memo_key: fullAccount.account.options.memo_key,
    voting_account_id: fullAccount.account.options.voting_account,
    voting_account_name: vote_acc_name?.data,
  };

  return retVal;
};

const getBalanceData = async (fullAccount) => {
  const balances = fullAccount.balances.map(async (value) => {
    const asset = await api.getAssetNameAndPrecision(value.asset_type);
    const balance = await api.parseBalance(
      fullAccount.limit_orders,
      fullAccount.call_orders,
      value,
      asset?.data.precision,
      asset?.data.symbol,
    );
    return balance?.data;
  });
  const val = await Promise.all(balances);
  let retVal = {
    asset: val,
    vesting: fullAccount.vesting_balances,
  };
  return retVal;
};

const getKeysAndAccountsData = async (fullAccount) => {
  const owner_keys = await api.parseAuth(
    fullAccount.account.owner.key_auths,
    'key',
  );
  const owner_accounts = await api.parseAuth(
    fullAccount.account.owner.account_auths,
    'account',
  );
  const active_keys = await api.parseAuth(
    fullAccount.account.active.key_auths,
    'key',
  );
  const active_accounts = await api.parseAuth(
    fullAccount.account.active.account_auths,
    'account',
  );
  const memo_keys = [fullAccount.account.options.memo_key];
  let retVal = {
    keys: {
      owner: owner_keys?.data,
      active: active_keys?.data,
      memo: memo_keys,
    },
    accounts: {
      owner: owner_accounts?.data,
      active: active_accounts?.data,
    },
  };
  return retVal;
};

const getCreatedAssetsData = async (fullAccount) => {
  const user_issued_assets = await api.parseUIAs(fullAccount.assets);
  return { user_issued_assets: user_issued_assets?.data };
};

const getVotesData = async (fullAccount) => {
  const votes = await api.parseVotes(fullAccount.votes);
  return votes?.data;
};

const getAccountHistoryData = async (fullAccount, search_after) => {
  const history = await api.getAccountHistory(
    fullAccount.account.id,
    search_after,
  );
  const val = await Promise.all(history?.data);
  return val;
};

const accountsService = {
  getAccountFullData,
  getBalanceData,
  getKeysAndAccountsData,
  getCreatedAssetsData,
  getVotesData,
  getAccountHistoryData,
};

export default accountsService;
