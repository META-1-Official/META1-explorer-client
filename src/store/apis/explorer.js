import axios from 'axios';
import { result } from 'lodash';
import {
  formatNumber,
  formatBalance,
  operationType,
  objectType,
} from '../../helpers/utility';
import useAsset from '../../helpers/useAsset';
import i18n from 'i18next';
import useAccount from '../../helpers/useAccount';

// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ES_WRAPPER_URL = BASE_URL + '/es';
const EXPLORER_URL = BASE_URL + '/explorer';

/* DASHBOARD SERVICE */
// operations
export const fetchLastOperations = ({ search_after }) => {
  const params = {
    size: 1000,
    from_date: 'now-1d',
    sort_by: '-operation_id_num',
    type: 'data',
    from: 0,
    to_date: 'now',
  };
  if (search_after !== undefined) {
    params.search_after = search_after;
  }

  return axios.get(`${ES_WRAPPER_URL}/account_history`, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
    params,
  });
};

export const fetchHeader = () => {
  return axios.get(`${EXPLORER_URL}/header`, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

export const getOperation = async (operation_id) => {
  const response = await axios.get(`${EXPLORER_URL}/operation`, {
    params: { operation_id },
  });
  const raw_obj = response.data.op;

  const op_text = await opText(response.data.op_type, raw_obj);
  let operation = {
    name: operation_id,
    fee: 2,
    block_num: response.data.block_num,
    virtual_op: response.data.virtual_op,
    trx_in_block: response.data.trx_in_block,
    op_in_trx: response.data.op_in_trx,
    result: response.data.result,
    type: response.data.op_type,
    raw: raw_obj,
    operation_text: op_text,
    block_time: response.data.block_time,
    trx_id: response.data.trx_id,
  };

  return { data: operation };
};

export const opText = (operation_type, operation) => {
  var operation_account = 0;
  var operation_text;
  var fee_paying_account;

  switch (operation_type) {
    case 0:
      var from = operation.from;
      var to = operation.to;

      var amount_asset_id = operation.amount_.asset_id;
      var amount_amount = operation.amount_.amount;

      operation_account = from;

      return useAccount(operation_account).then((response_name) => {
        // get me the to name:
        return useAccount(to).then((response_name_to) => {
          var to_name = response_name_to;

          return useAsset(amount_asset_id).then((response_asset) => {
            var asset_name = response_asset.data.symbol;
            var asset_precision = response_asset.data.precision;

            var divideby = Math.pow(10, asset_precision);
            var amount = Number(amount_amount / divideby);

            operation_text =
              "<a href='/#/accounts/" + from + "'>" + response_name + '</a>';
            operation_text =
              operation_text +
              i18n.t('sent') +
              formatNumber(amount) +
              " <a href='/#/assets/" +
              amount_asset_id +
              "'>" +
              asset_name +
              '</a>' +
              i18n.t('to') +
              "<a href='/#/accounts/" +
              to_name +
              "'>" +
              to_name +
              '</a>';

            return operation_text;
          });
        });
      });
    case 1:
      var seller = operation.seller;
      operation_account = seller;

      var amount_to_sell_asset_id = operation.amount_to_sell.asset_id;
      var amount_to_sell_amount = operation.amount_to_sell.amount;

      var min_to_receive_asset_id = operation.min_to_receive.asset_id;
      var min_to_receive_amount = operation.min_to_receive.amount;

      return useAccount(operation_account).then((response_name) => {
        return useAsset(amount_to_sell_asset_id).then((response_asset1) => {
          var sell_asset_name = response_asset1.data.symbol;
          var sell_asset_precision = response_asset1.data.precision;

          var divideby = Math.pow(10, sell_asset_precision);
          var sell_amount = Number(amount_to_sell_amount / divideby);

          return useAsset(min_to_receive_asset_id).then((response_asset2) => {
            var receive_asset_name = response_asset2.data.symbol;
            var receive_asset_precision = response_asset2.data.precision;

            var divideby = Math.pow(10, receive_asset_precision);
            var receive_amount = Number(min_to_receive_amount / divideby);

            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name +
              '</a>';
            operation_text =
              operation_text +
              i18n.t('wants') +
              formatNumber(receive_amount) +
              " <a href='/#/assets/" +
              min_to_receive_asset_id +
              "'>" +
              receive_asset_name +
              '</a>' +
              i18n.t('for');
            operation_text =
              operation_text +
              formatNumber(sell_amount) +
              " <a href='/#/assets/" +
              amount_to_sell_asset_id +
              "'>" +
              sell_asset_name +
              '</a>';
            return operation_text;
          });
        });
      });

    case 2:
      fee_paying_account = operation.fee_paying_account;
      operation_account = fee_paying_account;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>' +
          i18n.t('cancel order');
        return operation_text;
      });

    case 3:
      var funding_account = operation.funding_account;
      var delta_collateral_asset_id = operation.delta_collateral.asset_id;
      var delta_debt_asset_id = operation.delta_debt.asset_id;

      return useAccount(funding_account).then((response_name) => {
        return useAsset(delta_collateral_asset_id).then((response_asset1) => {
          var asset1 = response_asset1.data.symbol;

          return useAsset(delta_debt_asset_id).then((response_asset2) => {
            var asset2 = response_asset2.data.symbol;

            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name +
              '</a>' +
              i18n.t('update debt/collateral for');
            operation_text =
              operation_text +
              "<a href='#/markets/" +
              asset1 +
              '/' +
              asset2 +
              "'>" +
              asset1 +
              '/' +
              asset2 +
              '</a>';
            return operation_text;
          });
        });
      });

    case 4:
      var account_id = operation.account_id;
      operation_account = account_id;

      var pays_asset_id = operation.pays.asset_id;
      var pays_amount = operation.pays.amount;

      var receives_asset_id = operation.receives.asset_id;
      var receives_amount = operation.receives.amount;

      return useAccount(operation_account).then((response_name) => {
        return useAsset(pays_asset_id).then((response_asset1) => {
          var pays_asset_name = response_asset1.data.symbol;
          var pays_asset_precision = response_asset1.data.precision;

          var divideby = Math.pow(10, pays_asset_precision);

          var p_amount = parseFloat(pays_amount / divideby);

          return useAsset(receives_asset_id).then((response_asset2) => {
            var receive_asset_name = response_asset2.data.symbol;
            var receive_asset_precision = response_asset2.data.precision;

            var divideby = Math.pow(10, receive_asset_precision);
            var receive_amount = Number(receives_amount / divideby);

            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name +
              '</a>';
            operation_text =
              operation_text +
              i18n.t('paid') +
              formatNumber(p_amount) +
              " <a href='/#/assets/" +
              pays_asset_id +
              "'>" +
              pays_asset_name +
              '</a>' +
              i18n.t('for');
            operation_text =
              operation_text +
              formatNumber(receive_amount) +
              " <a href='/#/assets/" +
              receives_asset_id +
              "'>" +
              receive_asset_name +
              '</a>';
            return operation_text;
          });
        });
      });

    case 5:
      var registrar = operation.registrar;
      var referrer = operation.referrer;
      var name = operation.name;
      operation_account = registrar;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>' +
          i18n.t('register') +
          "<a href='/#/accounts/" +
          name +
          "'>" +
          name +
          '</a>';

        if (registrar !== referrer) {
          return useAccount(referrer).then((response_name2) => {
            operation_text =
              operation_text +
              i18n.t('thanks to') +
              "<a href='/#/accounts/" +
              referrer +
              "'>" +
              response_name2 +
              '</a>';
            return operation_text;
          });
        } else {
          return operation_text;
        }
      });
    case 6:
      operation_account = operation.account;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>' +
          i18n.t('updated account data');
        return operation_text;
      });

    case 7:
      operation_account = operation.authorizing_account;
      var account_to_list = operation.account_to_list;
      var new_listing = operation.new_listing;
      var type = i18n.t('whitelisted');
      if (new_listing === 2) type = i18n.t('blacklisted');

      return useAccount(operation_account).then((response_name) => {
        return useAccount(account_to_list).then((response_name2) => {
          operation_text =
            "<a href='/#/accounts/" +
            operation_account +
            "'>" +
            response_name +
            '</a> ' +
            type +
            i18n.t('the account') +
            "<a href='/#/accounts/" +
            account_to_list +
            "'>" +
            response_name2 +
            '</a>';
          return operation_text;
        });
      });

    case 8:
      return useAccount(operation.account_to_upgrade).then((response) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation.account_to_upgrade +
          "'>" +
          response +
          '</a> ' +
          i18n.t('upgraded the account');

        return operation_text;
      });

    case 14:
      var issuer = operation.issuer;
      var issue_to_account = operation.issue_to_account;
      var asset_to_issue_amount = operation.asset_to_issue.amount;
      var asset_to_issue_asset_id = operation.asset_to_issue.asset_id;

      return useAccount(issuer).then((response_name) => {
        return useAsset(asset_to_issue_asset_id).then((response_asset) => {
          var asset_precision = response_asset.data.precision;

          var divideby = Math.pow(10, asset_precision);
          var amount = Number(asset_to_issue_amount / divideby);

          return useAccount(issue_to_account).then((response_name2) => {
            operation_text =
              "<a href='/#/accounts/" +
              issuer +
              "'>" +
              response_name +
              '</a>' +
              i18n.t('issued') +
              amount;
            operation_text =
              operation_text +
              " <a href='/#/assets/" +
              asset_to_issue_asset_id +
              "'>" +
              response_asset.data.symbol +
              '</a>';
            operation_text =
              operation_text +
              i18n.t('to') +
              "<a href='/#/accounts/" +
              issue_to_account +
              "'>" +
              response_name2 +
              '</a>';
            return operation_text;
          });
        });
      });

    case 15:
      operation_account = operation.payer;

      var amount_to_reserve_amount = operation.amount_to_reserve.amount;
      var amount_to_reserve_asset_id = operation.amount_to_reserve.asset_id;

      return useAccount(operation_account).then((response_name) => {
        return useAsset(amount_to_reserve_asset_id).then((response_asset) => {
          var asset_name = response_asset.data.symbol;
          var asset_precision = response_asset.data.precision;
          var divideby = Math.pow(10, asset_precision);
          var amount = Number(amount_to_reserve_amount / divideby);

          operation_text =
            "<a href='/#/accounts/" +
            operation_account +
            "'>" +
            response_name +
            '</a>' +
            i18n.t('burned(reserved)') +
            formatNumber(amount) +
            " <a href='/#/assets/" +
            amount_to_reserve_asset_id +
            "'>" +
            asset_name +
            '</a>';
          return operation_text;
        });
      });

    case 19:
      var publisher = operation.publisher;
      var asset_id = operation.asset_id;
      operation_account = publisher;

      return useAccount(operation_account).then((response_name) => {
        return useAsset(asset_id).then((response_asset) => {
          operation_text =
            "<a href='/#/accounts/" +
            operation_account +
            "'>" +
            response_name +
            '</a>' +
            i18n.t('published feed for');
          operation_text =
            operation_text +
            "<a href='/#/assets/" +
            asset_id +
            "'>" +
            response_asset.data.symbol +
            '</a>';
          return operation_text;
        });
      });

    case 22:
      fee_paying_account = operation.fee_paying_account;
      operation_account = fee_paying_account;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>' +
          i18n.t('created a proposal');
        return operation_text;
      });

    case (22, 23, 24):
      fee_paying_account = operation.fee_paying_account;
      var proposal = operation.proposal;
      operation_account = fee_paying_account;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>  updated ';
        operation_text =
          operation_text +
          i18n.t('proposal') +
          "<a href='/#objects/" +
          proposal +
          "'>" +
          proposal +
          '</a>';
        return operation_text;
      });

    case 33:
      operation_account = operation.owner_;

      amount_amount = operation.amount_.amount;
      amount_asset_id = operation.amount_.asset_id;

      return useAccount(operation_account).then((response_name) => {
        return useAsset(amount_asset_id).then((response_asset) => {
          var asset_name = response_asset.data.symbol;
          var asset_precision = response_asset.data.precision;
          var divideby = Math.pow(10, asset_precision);
          var amount = Number(amount_amount / divideby);

          operation_text =
            "<a href='/#/accounts/" +
            operation_account +
            "'>" +
            response_name +
            '</a>' +
            i18n.t('withdrew vesting balance of') +
            formatNumber(amount) +
            " <a href='/#/assets/" +
            amount_asset_id +
            "'>" +
            asset_name +
            '</a>';
          return operation_text;
        });
      });

    case 37:
      operation_account = operation.deposit_to_account;

      var total_claimed_amount = operation.total_claimed.amount;
      var total_claimed_asset_id = operation.total_claimed.asset_id;

      return useAccount(operation_account).then((response_name) => {
        return useAsset(total_claimed_asset_id).then((response_asset) => {
          var asset_name = response_asset.data.symbol;
          var asset_precision = response_asset.data.precision;
          var divideby = Math.pow(10, asset_precision);
          var amount = Number(total_claimed_amount / divideby);

          operation_text =
            "<a href='/#/accounts/" +
            operation_account +
            "'>" +
            response_name +
            '</a>' +
            i18n.t('claimed a balance of') +
            formatNumber(amount) +
            " <a href='/#/assets/" +
            amount_to_reserve_asset_id +
            "'>" +
            asset_name +
            '</a>';
          return operation_text;
        });
      });

    case 45:
      operation_account = operation.bidder;

      var additional_collateral_amount = operation.additional_collateral.amount;
      var additional_collateral_asset_id =
        operation.additional_collateral.asset_id;

      var debt_covered_amount = operation.debt_covered.amount;
      var debt_covered_asset_id = operation.debt_covered.asset_id;

      return useAccount(operation_account).then((response_name) => {
        return useAsset(additional_collateral_asset_id).then(
          (additional_collateral_asset) => {
            var asset_name1 = additional_collateral_asset.data.symbol;
            var asset_precision1 = additional_collateral_asset.data.precision;
            var divideby1 = Math.pow(10, asset_precision1);
            var amount1 = Number(additional_collateral_amount / divideby1);

            return useAsset(debt_covered_asset_id).then(
              (debt_covered_asset) => {
                var asset_name2 = debt_covered_asset.data.symbol;
                var asset_precision2 = debt_covered_asset.data.precision;
                var divideby2 = Math.pow(10, asset_precision2);
                var amount2 = Number(debt_covered_amount / divideby2);

                operation_text =
                  "<a href='/#/accounts/" +
                  operation_account +
                  "'>" +
                  response_name +
                  '</a>' +
                  i18n.t('bid') +
                  formatNumber(amount1) +
                  " <a href='/#/assets/" +
                  additional_collateral_asset_id +
                  "'>" +
                  asset_name1 +
                  '</a>' +
                  i18n.t('for') +
                  formatNumber(amount2) +
                  " <a href='/#/assets/" +
                  debt_covered_asset_id +
                  "'>" +
                  asset_name2 +
                  '</a>';
                return operation_text;
              },
            );
          },
        );
      });

    case 49:
      operation_account = operation.from;

      var amount_ = operation.amount_.amount;
      asset_id = operation.amount_.asset_id;

      to = operation.to;

      return useAccount(operation_account).then((response_name) => {
        return useAsset(asset_id).then((asset) => {
          var asset_name = asset.data.symbol;
          var asset_precision = asset.data.precision;
          var divideby = Math.pow(10, asset_precision);
          var amount = Number(amount_ / divideby);

          return useAccount(to).then((response_name2) => {
            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name +
              '</a>' +
              i18n.t('create HTLC to') +
              "<a href='/#/accounts/" +
              to +
              "'>" +
              response_name2 +
              '</a>' +
              i18n.t('to transfer') +
              formatNumber(amount) +
              " <a href='/#/assets/" +
              asset_id +
              "'>" +
              asset_name +
              '</a>';
            return operation_text;
          });
        });
      });

    case 50:
      operation_account = operation.redeemer;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>' +
          i18n.t('redeem HTLC');
        return operation_text;
      });

    case 51:
      operation_account = operation.from;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>' +
          i18n.t('redeemed HTLC');
        return operation_text;
      });

    case 52:
      operation_account = operation.update_issuer;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>' +
          i18n.t('extend HTLC');
        return operation_text;
      });

    case 53:
      operation_account = operation.to;

      return useAccount(operation_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name +
          '</a>' +
          i18n.t('refund HTLC');
        return operation_text;
      });

    case 54:
      return useAccount(operation.issuer).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          response_name +
          "'> " +
          i18n.t('created property') +
          operation.property_id;
        return operation_text;
      });

    case 55:
      return useAccount(operation.issuer).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          response_name +
          "'> " +
          i18n.t('updated property') +
          operation.property_to_update;
        return operation_text;
      });

    case 56:
      return useAccount(operation.issuer).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          response_name +
          "'> " +
          i18n.t('approved property') +
          operation.property_to_approve;
        return operation_text;
      });

    case 57:
      return useAccount(operation.fee_paying_account).then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          response_name +
          "'> " +
          i18n.t('deleted property') +
          operation.property;
        return operation_text;
      });

    case 58:
      operation_account = operation.fee_paying_account;
      var symbol = operation.symbol;
      return useAccount(operation_account).then((response_name) => {
        return useAsset(symbol).then((asset) => {
          var asset_name = asset.data.symbol;
          var asset_precision = asset.data.precision;
          var divideby = Math.pow(10, asset_precision);
          var symbol_amount = Number(
            operation.usd_price.denominator / divideby,
          );
          var usd_amount = Number(
            operation.usd_price.numerator / Math.pow(10, 6),
          );

          operation_text =
            "<a href='/#/accounts/" +
            response_name +
            "'>" +
            response_name +
            '</a>' +
            i18n.t('published price');
          operation_text =
            operation_text +
            usd_amount / symbol_amount +
            ' ' +
            'USD' +
            '/' +
            "<a href='/#/assets/" +
            asset_name +
            "'>" +
            asset_name +
            '</a>' +
            ' ';
          return operation_text;
        });
      });
    default:
      operation_text = '';
      return operation_text;
  }
};

/* SEARCH SERVICE */
export const fetchLastBlockNumber = () => {
  return axios.get(EXPLORER_URL + '/last_block_number', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

export const fetchLookupAssets = ({ start }) => {
  return axios.get(
    EXPLORER_URL + '/lookup_assets?start=' + start.toUpperCase(),
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    },
  );
};

export const fetchLookupAccounts = ({ start }) => {
  return axios.get(EXPLORER_URL + '/lookup_accounts?start=' + start, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

/* BLOCKS SERVICE */
// big blocks (first 20 big blocks by order)
export const fetchBigBlocks = () => {
  return axios.get(
    BASE_URL +
      '/es/account_history?from_date=now-1w&to_date=now&type=aggs&agg_field=block_data.block_num&size=20',
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    },
  );
};

// block by id
export const fetchBlock = async (block_num) => {
  const response = await axios.get(
    EXPLORER_URL + '/block?block_num=' + block_num,
  );
  let operations_count = 0;
  for (let i = 0; i < response.data.transactions.length; i++) {
    operations_count =
      operations_count + response.data.transactions[i].operations.length;
  }
  let block = {
    transactions: response.data.transactions,
    block_num: block_num,
    previous: response.data.previous,
    timestamp: response.data.timestamp,
    witness: response.data.witness,
    witness_signature: response.data.witness_signature,
    transaction_merkle_root: response.data.transaction_merkle_root,
    transactions_count: response.data.transactions.length,
    operations_count: operations_count,
    next: parseInt(block_num) + 1,
    prev: parseInt(block_num) - 1,
  };
  return { data: block };
};

/* TRANSACTION SERVICE */
// big transactions (first 20 big transactions by order)
export const fetchBigTransactions = () => {
  return axios.get(
    BASE_URL +
      '/es/account_history?from_date=now-1h&to_date=now&type=aggs&agg_field=block_data.trx_id.keyword&size=20',
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    },
  );
};

// get transaction meta data
export const fetchTransaction = ({ trx }) => {
  return axios.get(
    BASE_URL +
      '/es/trx?trx=' +
      trx +
      '&size=100&sort=-operation_history.sequence',
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    },
  );
};

/* ASSET SERVICE */
// assets
export const fetchActiveAssets = () => {
  return axios.get(EXPLORER_URL + '/assets', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

export const fetchDexVolume = () => {
  return axios.get(EXPLORER_URL + '/dex_total_volume', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// daily dex chart
export const fetchDailyDEXChart = () => {
  return axios.get(EXPLORER_URL + '/daily_volume_dex_data', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// asset detail
export const fetchAssetFull = ({ asset_id }) => {
  return axios.get(EXPLORER_URL + '/asset_and_volume?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// asset holders
export const fetchAssetHolders = ({ asset_id }) => {
  return axios.get(EXPLORER_URL + '/asset_holders?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// asset holders count
export const fetchAssetHoldersCount = ({ asset_id }) => {
  return axios.get(EXPLORER_URL + '/asset_holders_count?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// asset by asset id
export const fetchAsset = (asset_id) => {
  return axios.get(EXPLORER_URL + '/asset?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

/* MARKET SERVICE */
// asset markets
export const fetchAssetMarkets = ({ asset_id }) => {
  return axios.get(EXPLORER_URL + '/markets?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// most active markets
export const fetchActiveMarkets = () => {
  return axios.get(EXPLORER_URL + '/most_active_markets', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// get ticker
export const fetchTicker = ({ base, quote }) => {
  return axios.get(EXPLORER_URL + '/ticker?base=' + base + '&quote=' + quote, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// order book
export const fetchOrderBook = ({ base, quote }) => {
  return axios.get(
    EXPLORER_URL + '/order_book?base=' + base + '&quote=' + quote + '&limit=10',
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    },
  );
};

// grouped order book
export const fetchGroupedOrderBook = ({ base, quote }) => {
  return axios.get(
    EXPLORER_URL +
      '/grouped_limit_orders?base=' +
      base +
      '&quote=' +
      quote +
      '&group=10&limit=10',
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    },
  );
};

/* FEE SERVICE */
// fees
export const fetchFees = () => {
  return axios.get(EXPLORER_URL + '/fees', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

/* OBJECT SERVICE */
// object
export const getObject = async (obj_id) => {
  const obj = await axios.get(EXPLORER_URL + '/object?object=' + obj_id);
  const object_id = obj.data.id;
  const object_type = objectType(object_id);

  let object = {
    raw: obj.data,
    name: object_id,
    type: object_type,
  };

  return { data: object };
};

/* GOVERNANCE SERVICE */
// committee members
export const fetchCommitteeMembers = () => {
  return axios.get(EXPLORER_URL + '/committee_members', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// witness
export const fetchWitnesses = () => {
  return axios.get(EXPLORER_URL + '/witnesses', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

/* ACCOUNT SERVICE */
// fetch accounts list
export const getRichList = async () => {
  const response = await axios.get(EXPLORER_URL + '/accounts');
  const richs = [];
  for (let i = 0; i < response.data.length; i++) {
    const amount = formatBalance(response.data[i].amount, 5);
    const account = {
      name: response.data[i].name,
      id: response.data[i].account_id,
      amount: amount,
    };
    richs.push(account);
  }
  return { data: richs };
};

export const checkIfWorker = async (account_id) => {
  const results = [];
  let is_worker = false;
  let worker_votes = 0;
  const response = await axios.get(EXPLORER_URL + '/workers');
  for (let i = 0; i < response.data.length; i++) {
    const worker_account = response.data[i][0].worker_account;
    if (worker_account === account_id) {
      is_worker = true;
      worker_votes = formatBalance(response.data[i][0].total_votes_for, 5);
      results[0] = is_worker;
      results[1] = worker_votes;

      return { data: results };
    }
  }
};

export const checkIfWitness = async (account_id) => {
  const results = [];
  let is_witness = false;
  let witness_votes = 0;
  const response = await axios.get(EXPLORER_URL + '/witnesses');
  for (let i = 0; i < response.data.length; i++) {
    const witness_account = response.data[i].witness_account;
    if (witness_account === account_id) {
      is_witness = true;
      witness_votes = formatBalance(response.data[i].total_votes, 5);
      results[0] = is_witness;
      results[1] = witness_votes;
      results[2] = witness_account;
      results[3] = response.data[i].witness_account_name;
      results[4] = response.data[i].id;
      results[5] = response.data[i].url;

      return { data: result };
    }
  }
};

export const checkIfCommittee = async (account_id) => {
  const results = [];
  let is_committee_member = false;
  let committee_votes = 0;
  const response = await axios.get(EXPLORER_URL + '/committee_members');
  for (let i = 0; i < response.data.length; i++) {
    const committee_member_account =
      response.data[i][0].committee_member_account;
    if (committee_member_account === account_id) {
      is_committee_member = true;
      committee_votes = formatBalance(response.data[i][0].total_votes, 5);
      results[0] = is_committee_member;
      results[1] = committee_votes;
      results[2] = committee_member_account;
      results[3] = response.data[i][0].committee_member_account_name;
      results[4] = response.data[i][0].id;
      results[5] = response.data[i][0].url;

      return { data: results };
    }
  }
};

export const checkIfProxy = async (account_id) => {
  const results = [];
  let is_proxy = false;
  let proxy_votes = 0;
  const response = await axios.get(EXPLORER_URL + '/top_proxies');
  for (let i = 0; i < response.data.length; i++) {
    const proxy_account = response.data[i].id;
    if (proxy_account === account_id) {
      is_proxy = true;
      proxy_votes = formatBalance(response.data[i].bts_weight, 5);
      results[0] = is_proxy;
      results[1] = proxy_votes;

      return { data: results };
    }
  }
};

export const getReferrers = async (account_id, page) => {
  const results = [];
  const response = await axios.get(
    EXPLORER_URL + '/all_referrers?account_id=' + account_id + '&page=' + page,
  );

  for (let i = 0; i < response.data.length; i++) {
    const referrer = {
      account_id: response.data[i].account_id,
      account_name: response.data[i].account_name,
    };
    results.push(referrer);
  }

  return { data: results };
};

export const getReferrerCount = async (account) => {
  let count = 0;
  const response = await axios.get(
    EXPLORER_URL + '/referrer_count?account_id=' + account,
  );
  count = response.data;

  return { data: count };
};

export const getFullAccount = async (account) => {
  let full_account = {};
  const response = await axios.get(
    EXPLORER_URL + '/full_account?account_id=' + account,
  );
  full_account = response.data;

  return { data: full_account };
};

export const getTotalAccountOps = async (account_id) => {
  const response = await axios.get(
    BASE_URL +
      '/es/account_history?account_id=' +
      account_id +
      '&from_date=2015-10-10&to_date=now&type=count&agg_field=operation_type',
  );
  let count = 0;
  await response.data.map((value, key) => {
    count = count + value.doc_count;
    return value;
  });
  return { data: count };
};

export const parseAuth = async (auth, type) => {
  const results = [];
  await auth.map(async (value) => {
    let authline = {};
    if (type === 'key') {
      authline = {
        key: value[0],
        threshold: value[1],
      };
      results.push(authline);
    } else if (type === 'account') {
      const response = await useAccount(value[0]);
      authline = {
        account: value[0],
        threshold: value[1],
        account_name: response,
      };
      results.push(authline);
    }
  });
  return { data: results };
};

export const parseBalance = async (
  limit_orders,
  call_orders,
  balance,
  precision,
  symbol,
) => {
  let limit_orders_counter = 0;
  await limit_orders.map(async (value) => {
    if (value.sell_price.quote.asset_id === balance.asset_type) {
      limit_orders_counter++;
    }
  });
  let call_orders_counter = 0;
  await call_orders.map(async (value) => {
    if (value.call_price.quote.asset_id === balance.asset_type) {
      call_orders_counter++;
    }
  });
  const balanceline = {
    asset: balance.asset_type,
    asset_name: symbol,
    balance: parseFloat(formatBalance(balance.balance, precision)),
    id: balance.id,
    call_orders_counter: parseInt(call_orders_counter),
    limit_orders_counter: parseInt(limit_orders_counter),
  };
  return { data: balanceline };
};

export const parseVotes = async (votes) => {
  const results = await votes.map(async (value) => {
    let type = '';
    let account;
    let votable_object_name = '';
    let votes_for = 0;
    if (value.id.substr(0, 4) === '1.6.') {
      type = 'Witness';
      account = value.witness_account;
      votes_for = value.total_votes;
    } else if (value.id.substr(0, 4) === '1.5.') {
      type = 'Committee Member';
      account = value.committee_member_account;
      votes_for = value.total_votes;
    } else if (value.id.substr(0, 4) === '1.14') {
      type = 'Worker';
      account = value.worker_account;
      votable_object_name = value.name;
      votes_for = value.total_votes_for;
    } else {
      type = 'Other';
      account = 'No name';
    }
    const response = await useAccount(account);
    return {
      id: value.id,
      type: type,
      account: account,
      account_name: response,
      votable_object_name: votable_object_name,
      votes_for: votes_for,
    };
  });
  let retVal = Promise.all(results);
  return { data: retVal };
};

export const getAssetNameAndPrecision = async (asset_id) => {
  const results = {};
  const response = await axios.get(
    EXPLORER_URL + '/asset?asset_id=' + asset_id,
  );
  results.symbol = response.data.symbol;
  results.precision = response.data.precision;

  return { data: results };
};

export const parseUIAs = async (assets) => {
  const results = [];
  await assets.map(async (value) => {
    const retData = await getAssetNameAndPrecision(value);
    const uia = {
      asset_id: value,
      asset_name: retData.data.symbol,
    };
    results.push(uia);
  });
  return { data: results };
};

export const parseProposals = async (proposals) => {
  const results = [];
  await proposals.map(async (value) => {
    const proposal = {
      id: value,
    };
    results.push(proposal);
  });

  return { data: results };
};

export const parseVesting = async (vesting_balances) => {
  const results = [];
  if (vesting_balances.length > 0) {
    vesting_balances.map(async (value) => {
      const retData = await getAssetNameAndPrecision(value.balance.asset_id);
      const vesting = {
        id: value.id,
        balance: formatBalance(value.balance.amount, retData.precision),
        asset_id: value.balance.asset_id,
        asset_name: retData.data.symbol,
      };
      results.push(vesting);
    });
    return { data: results };
  }
  return { data: [] };
};

export const getAccountHistory = async (
  account_id,
  from,
  search_after,
  object_ids,
) => {
  const params = {
    account_id,
    from,
    size: 100,
    type: 'data',
    sort_by: '-account_history.sequence',
  };
  if (search_after && search_after !== 1) {
    params.search_after = search_after;
  }
  if (object_ids && object_ids.length) {
    params.object_ids = object_ids;
  }

  const response = await axios.get(BASE_URL + '/es/account_history', {
    params,
  });

  return { data: response };
};

/* CHART SERVICE */
export const topOperationsChart = async () => {
  const response = await axios.get(
    BASE_URL +
      '/es/account_history?from_date=now-1d&to_date=now&type=aggs&agg_field=operation_type&size=10',
  );
  const data = [];
  let c = 0;
  for (let i = 0; i < response.data.length; i++) {
    ++c;
    if (c > 7) {
      break;
    }

    const name = operationType(response.data[i].key)[0];
    data.push({
      value: response.data[i].doc_count,
      name: name,
    });
  }
  return { data: { data } };
};

export const topProxiesChart = async () => {
  const response = await axios.get(EXPLORER_URL + '/top_proxies');
  let data = [];
  for (let i = 0; i < response.data.length; i++) {
    data.push({
      value: response.data[i]['bts_weight'],
      name: response.data[i].name,
    });
  }
  return { data: { data } };
};

export const topMarketsChart = async () => {
  const response = await axios.get(EXPLORER_URL + '/top_markets');
  const data = [
    { value: response.data[0]['24h_volume'], name: response.data[0].pair },
    { value: response.data[1]['24h_volume'], name: response.data[1].pair },
    { value: response.data[2]['24h_volume'], name: response.data[2].pair },
    { value: response.data[3]['24h_volume'], name: response.data[3].pair },
    { value: response.data[4]['24h_volume'], name: response.data[4].pair },
    { value: response.data[5]['24h_volume'], name: response.data[5].pair },
    { value: response.data[6]['24h_volume'], name: response.data[6].pair },
  ];
  return { data: { data } };
};

export const topSmartCoinsChart = async () => {
  const response = await axios.get(EXPLORER_URL + '/top_smartcoins');
  const data = [];
  for (let i = 0; i < response.data.length; i++) {
    data.push({
      value: response.data[i]['24h_volume'],
      name: response.data[i].asset_name,
    });
  }
  return { data: { data } };
};

export const topUIAsChart = async () => {
  const response = await axios.get(EXPLORER_URL + '/top_uias');
  const data = [];
  for (let i = 0; i < response.data.length; i++) {
    data.push({
      value: response.data[i]['24h_volume'],
      name: response.data[i].asset_name,
    });
  }
  return { data: { data } };
};

export const topHoldersChart = async () => {
  const response = await axios.get(EXPLORER_URL + '/top_holders');
  const data = [
    { value: response.data[0].amount, name: response.data[0].account_name },
    { value: response.data[1].amount, name: response.data[1].account_name },
    { value: response.data[2].amount, name: response.data[2].account_name },
    { value: response.data[3].amount, name: response.data[3].account_name },
    { value: response.data[4].amount, name: response.data[4].account_name },
    { value: response.data[5].amount, name: response.data[5].account_name },
    { value: response.data[6].amount, name: response.data[6].account_name },
  ];
  return { data: { data } };
};

export const getLookupTransactions = async (start) => {
  const response = await axios.get(EXPLORER_URL + '/lookup_transactions', {
    params: { start },
  });
  return response;
};
