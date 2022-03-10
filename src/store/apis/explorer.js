import axios from 'axios';
import { formatNumber } from '../../helpers/utility';

const BASE_URL = 'https://explorer.meta1.io:5000';

/* DASHBOARD SERVICE */
// operations
export const fetchLastOperations = ({ search_after }) => {
  let req_url =
    BASE_URL +
    '/es/account_history?size=10000&from_date=now-1d&sort_by=-operation_id_num';

  if (search_after !== undefined)
    req_url = req_url + '&search_after=' + search_after;

  return axios.get(req_url, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

export const fetchHeader = () => {
  return axios.get(BASE_URL + '/header', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

export const opText = (operation_type, operation) => {
  var operation_account = 0;
  var operation_text;
  var fee_paying_account;

  if (operation_type === 0) {
    var from = operation.from;
    var to = operation.to;

    var amount_asset_id = operation.amount_.asset_id;
    var amount_amount = operation.amount_.amount;

    operation_account = from;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        // get me the to name:
        return axios
          .get(BASE_URL + '/account_name?account_id=' + to)
          .then((response_name_to) => {
            var to_name = response_name_to.data;

            return axios
              .get(BASE_URL + '/asset?asset_id=' + amount_asset_id)
              .then((response_asset) => {
                var asset_name = response_asset.data.symbol;
                var asset_precision = response_asset.data.precision;

                var divideby = Math.pow(10, asset_precision);
                var amount = Number(amount_amount / divideby);

                operation_text =
                  "<a href='/#/accounts/" +
                  from +
                  "'>" +
                  response_name.data +
                  '</a>';
                operation_text =
                  operation_text +
                  ' sent ' +
                  formatNumber(amount) +
                  " <a href='/#/assets/" +
                  amount_asset_id +
                  "'>" +
                  asset_name +
                  "</a> to <a href='/#/accounts/" +
                  to +
                  "'>" +
                  to_name +
                  '</a>';

                return operation_text;
              });
          });
      });
  } else if (operation_type === 1) {
    var seller = operation.seller;
    operation_account = seller;

    var amount_to_sell_asset_id = operation.amount_to_sell.asset_id;
    var amount_to_sell_amount = operation.amount_to_sell.amount;

    var min_to_receive_asset_id = operation.min_to_receive.asset_id;
    var min_to_receive_amount = operation.min_to_receive.amount;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + amount_to_sell_asset_id)
          .then((response_asset1) => {
            var sell_asset_name = response_asset1.data.symbol;
            var sell_asset_precision = response_asset1.data.precision;

            var divideby = Math.pow(10, sell_asset_precision);
            var sell_amount = Number(amount_to_sell_amount / divideby);

            return axios
              .get(BASE_URL + '/asset?asset_id=' + min_to_receive_asset_id)
              .then((response_asset2) => {
                var receive_asset_name = response_asset2.data.symbol;
                var receive_asset_precision = response_asset2.data.precision;

                var divideby = Math.pow(10, receive_asset_precision);
                var receive_amount = Number(min_to_receive_amount / divideby);

                operation_text =
                  "<a href='/#/accounts/" +
                  operation_account +
                  "'>" +
                  response_name.data +
                  '</a>';
                operation_text =
                  operation_text +
                  ' wants ' +
                  formatNumber(receive_amount) +
                  " <a href='/#/assets/" +
                  min_to_receive_asset_id +
                  "'>" +
                  receive_asset_name +
                  '</a> for ';
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
  } else if (operation_type === 2) {
    fee_paying_account = operation.fee_paying_account;
    operation_account = fee_paying_account;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          '</a> cancel order';
        return operation_text;
      });
  } else if (operation_type === 3) {
    var funding_account = operation.funding_account;
    var delta_collateral_asset_id = operation.delta_collateral.asset_id;
    var delta_debt_asset_id = operation.delta_debt.asset_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + funding_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + delta_collateral_asset_id)
          .then((response_asset1) => {
            var asset1 = response_asset1.data.symbol;

            return axios
              .get(BASE_URL + '/asset?asset_id=' + delta_debt_asset_id)
              .then((response_asset2) => {
                var asset2 = response_asset2.data.symbol;

                operation_text =
                  "<a href='/#/accounts/" +
                  operation_account +
                  "'>" +
                  response_name.data +
                  '</a> update debt/collateral for ';
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
  } else if (operation_type === 4) {
    var account_id = operation.account_id;
    operation_account = account_id;

    var pays_asset_id = operation.pays.asset_id;
    var pays_amount = operation.pays.amount;

    var receives_asset_id = operation.receives.asset_id;
    var receives_amount = operation.receives.amount;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + pays_asset_id)
          .then((response_asset1) => {
            var pays_asset_name = response_asset1.data.symbol;
            var pays_asset_precision = response_asset1.data.precision;

            var divideby = Math.pow(10, pays_asset_precision);

            var p_amount = parseFloat(pays_amount / divideby);

            return axios
              .get(BASE_URL + '/asset?asset_id=' + receives_asset_id)
              .then((response_asset2) => {
                var receive_asset_name = response_asset2.data.symbol;
                var receive_asset_precision = response_asset2.data.precision;

                var divideby = Math.pow(10, receive_asset_precision);
                var receive_amount = Number(receives_amount / divideby);

                operation_text =
                  "<a href='/#/accounts/" +
                  operation_account +
                  "'>" +
                  response_name.data +
                  '</a>';
                operation_text =
                  operation_text +
                  ' paid ' +
                  formatNumber(p_amount) +
                  " <a href='/#/assets/" +
                  pays_asset_id +
                  "'>" +
                  pays_asset_name +
                  '</a> for ';
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
  } else if (operation_type === 5) {
    var registrar = operation.registrar;
    var referrer = operation.referrer;
    var name = operation.name;
    operation_account = registrar;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          "</a>  register <a href='/#/accounts/" +
          name +
          "'>" +
          name +
          '</a>';

        if (registrar !== referrer) {
          return axios
            .get(BASE_URL + '/account_name?account_id=' + referrer)
            .then((response_name2) => {
              operation_text =
                operation_text +
                ' thanks to ' +
                "<a href='/#/accounts/" +
                referrer +
                "'>" +
                response_name2.data +
                '</a>';
              return operation_text;
            });
        } else {
          return operation_text;
        }
      });
  } else if (operation_type === 6) {
    operation_account = operation.account;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          '</a> updated account data';
        return operation_text;
      });
  } else if (operation_type === 7) {
    // ACCOUNT WHITELIST
    operation_account = operation.authorizing_account;
    var account_to_list = operation.account_to_list;
    var new_listing = operation.new_listing;
    var type = 'whitelisted';
    if (new_listing === 2) type = 'blacklisted';

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/account_name?account_id=' + account_to_list)
          .then((response_name2) => {
            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name.data +
              '</a> ' +
              type +
              ' the account ' +
              "<a href='/#/accounts/" +
              account_to_list +
              "'>" +
              response_name2.data +
              '</a>';
            return operation_text;
          });
      });
  } else if (operation_type === 14) {
    var issuer = operation.issuer;
    var issue_to_account = operation.issue_to_account;
    var asset_to_issue_amount = operation.asset_to_issue.amount;
    var asset_to_issue_asset_id = operation.asset_to_issue.asset_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + issuer)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + asset_to_issue_asset_id)
          .then((response_asset) => {
            var asset_name = response_asset.data.symbol;
            var asset_precision = response_asset.data.precision;

            var divideby = Math.pow(10, asset_precision);
            var amount = Number(asset_to_issue_amount / divideby);

            return axios
              .get(BASE_URL + '/account_name?account_id=' + issue_to_account)
              .then((response_name2) => {
                operation_text =
                  "<a href='/#/accounts/" +
                  issuer +
                  "'>" +
                  response_name.data +
                  '</a>  issued ' +
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
                  " to <a href='/#/accounts/" +
                  issue_to_account +
                  "'>" +
                  response_name2.data +
                  '</a>';
                return operation_text;
              });
          });
      });
  } else if (operation_type === 15) {
    operation_account = operation.payer;

    var amount_to_reserve_amount = operation.amount_to_reserve.amount;
    var amount_to_reserve_asset_id = operation.amount_to_reserve.asset_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + amount_to_reserve_asset_id)
          .then((response_asset) => {
            var asset_name = response_asset.data.symbol;
            var asset_precision = response_asset.data.precision;
            var divideby = Math.pow(10, asset_precision);
            var amount = Number(amount_to_reserve_amount / divideby);

            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name.data +
              '</a> burned(reserved) ' +
              formatNumber(amount) +
              " <a href='/#/assets/" +
              amount_to_reserve_asset_id +
              "'>" +
              asset_name +
              '</a>';
            return operation_text;
          });
      });
  } else if (operation_type === 19) {
    var publisher = operation.publisher;
    var asset_id = operation.asset_id;
    operation_account = publisher;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + asset_id)
          .then((response_asset) => {
            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name.data +
              '</a>  published feed for ';
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
  } else if (operation_type === 22) {
    fee_paying_account = operation.fee_paying_account;
    operation_account = fee_paying_account;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          '</a>  created a proposal';
        return operation_text;
      });
  } else if (operation_type === 23) {
    fee_paying_account = operation.fee_paying_account;
    var proposal = operation.proposal;
    operation_account = fee_paying_account;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          '</a>  updated ';
        operation_text =
          operation_text +
          " proposal <a href='/#objects/" +
          proposal +
          "'>" +
          proposal +
          '</a>';
        return operation_text;
      });
  } else if (operation_type === 33) {
    operation_account = operation.owner_;

    var amount_amount = operation.amount_.amount;
    var amount_asset_id = operation.amount_.asset_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + amount_asset_id)
          .then((response_asset) => {
            var asset_name = response_asset.data.symbol;
            var asset_precision = response_asset.data.precision;
            var divideby = Math.pow(10, asset_precision);
            var amount = Number(amount_amount / divideby);

            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name.data +
              '</a> withdrew vesting balance of ' +
              formatNumber(amount) +
              " <a href='/#/assets/" +
              amount_asset_id +
              "'>" +
              asset_name +
              '</a>';
            return operation_text;
          });
      });
  } else if (operation_type === 37) {
    // BALANCE_CLAIM
    operation_account = operation.deposit_to_account;

    var total_claimed_amount = operation.total_claimed.amount;
    var total_claimed_asset_id = operation.total_claimed.asset_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + total_claimed_asset_id)
          .then((response_asset) => {
            var asset_name = response_asset.data.symbol;
            var asset_precision = response_asset.data.precision;
            var divideby = Math.pow(10, asset_precision);
            var amount = Number(total_claimed_amount / divideby);

            operation_text =
              "<a href='/#/accounts/" +
              operation_account +
              "'>" +
              response_name.data +
              '</a> claimed a balance of ' +
              formatNumber(amount) +
              " <a href='/#/assets/" +
              amount_to_reserve_asset_id +
              "'>" +
              asset_name +
              '</a>';
            return operation_text;
          });
      });
  } else if (operation_type === 45) {
    // BID COLLATERAL
    operation_account = operation.bidder;

    var additional_collateral_amount = operation.additional_collateral.amount;
    var additional_collateral_asset_id =
      operation.additional_collateral.asset_id;

    var debt_covered_amount = operation.debt_covered.amount;
    var debt_covered_asset_id = operation.debt_covered.asset_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + additional_collateral_asset_id)
          .then((additional_collateral_asset) => {
            var asset_name1 = additional_collateral_asset.data.symbol;
            var asset_precision1 = additional_collateral_asset.data.precision;
            var divideby1 = Math.pow(10, asset_precision1);
            var amount1 = Number(additional_collateral_amount / divideby1);

            return axios
              .get(BASE_URL + '/asset?asset_id=' + debt_covered_asset_id)
              .then((debt_covered_asset) => {
                var asset_name2 = debt_covered_asset.data.symbol;
                var asset_precision2 = debt_covered_asset.data.precision;
                var divideby2 = Math.pow(10, asset_precision2);
                var amount2 = Number(debt_covered_amount / divideby2);

                operation_text =
                  "<a href='/#/accounts/" +
                  operation_account +
                  "'>" +
                  response_name.data +
                  '</a> bid ' +
                  formatNumber(amount1) +
                  " <a href='/#/assets/" +
                  additional_collateral_asset_id +
                  "'>" +
                  asset_name1 +
                  '</a> for ' +
                  formatNumber(amount2) +
                  " <a href='/#/assets/" +
                  debt_covered_asset_id +
                  "'>" +
                  asset_name2 +
                  '</a>';
                return operation_text;
              });
          });
      });
  } else if (operation_type === 49) {
    // HTLC CREATE
    operation_account = operation.from;

    var amount_ = operation.amount_.amount;
    var asset_id = operation.amount_.asset_id;

    var to = operation.to;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + asset_id)
          .then((asset) => {
            var asset_name = asset.data.symbol;
            var asset_precision = asset.data.precision;
            var divideby = Math.pow(10, asset_precision);
            var amount = Number(amount_ / divideby);

            return axios
              .get(BASE_URL + '/account_name?account_id=' + to)
              .then((response_name2) => {
                operation_text =
                  "<a href='/#/accounts/" +
                  operation_account +
                  "'>" +
                  response_name.data +
                  "</a> create HTLC to <a href='/#/accounts/" +
                  to +
                  "'>" +
                  response_name2.data +
                  '</a> to transfer ' +
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
  } else if (operation_type === 50) {
    // HTLC REDEEM
    operation_account = operation.redeemer;
    var htlc_id = operation.htlc_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          '</a> redeem HTLC';
        return operation_text;
      });
  } else if (operation_type === 51) {
    // HTLC REDEEMED
    operation_account = operation.from;
    var htlc_id = operation.htlc_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          '</a> redeemed HTLC';
        return operation_text;
      });
  } else if (operation_type === 52) {
    // HTLC EXTEND
    operation_account = operation.update_issuer;
    var htlc_id = operation.htlc_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          '</a> extend HTLC';
        return operation_text;
      });
  } else if (operation_type === 53) {
    // HTLC REFUND
    operation_account = operation.to;
    var htlc_id = operation.htlc_id;

    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          operation_account +
          "'>" +
          response_name.data +
          '</a> refund HTLC';
        return operation_text;
      });
  } else if (operation_type === 54) {
    // PROPERTY CREATE
    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation.issuer)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          response_name +
          "'> " +
          ' created property ' +
          operation.property_id;
        return operation_text;
      });
  } else if (operation_type === 55) {
    // PROPERTY UPDATE
    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation.issuer)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          response_name +
          "'> " +
          ' updated property ' +
          operation.property_to_update;
        return operation_text;
      });
  } else if (operation_type === 56) {
    // PROPERTY APPROVE
    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation.issuer)
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          response_name +
          "'> " +
          ' approved property ' +
          operation.property_to_approve;
        return operation_text;
      });
  } else if (operation_type === 57) {
    // PROPERTY DELETE
    return axios
      .get(
        BASE_URL + '/account_name?account_id=' + operation.fee_paying_account,
      )
      .then((response_name) => {
        operation_text =
          "<a href='/#/accounts/" +
          response_name +
          "'> " +
          ' deleted property ' +
          operation.property;
        return operation_text;
      });
  } else if (operation_type === 58) {
    // ASSET PRICE PUBLISH
    operation_account = operation.fee_paying_account;
    var symbol = operation.symbol;
    return axios
      .get(BASE_URL + '/account_name?account_id=' + operation_account)
      .then((response_name) => {
        return axios
          .get(BASE_URL + '/asset?asset_id=' + symbol)
          .then((asset) => {
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
              response_name.data +
              '</a>  published price ';
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
  } else {
    operation_text = '';
    return operation_text;
  }
};

/* SEARCH SERVICE */
export const fetchLastBlockNumber = () => {
  return axios.get(BASE_URL + '/last_block_number', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

export const fetchLookupAssets = ({ start }) => {
  return axios.get(BASE_URL + '/lookup_assets?start=' + start.toUpperCase(), {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

export const fetchLookupAccounts = ({ start }) => {
  return axios.get(BASE_URL + '/lookup_accounts?start=' + start, {
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
export const fetchBlock = (block_num) => {
  return axios.get(
    BASE_URL +
    '/block?block_num=' + block_num,
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    },
  );
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
export const fetchTransaction = ({trx}) => {
  return axios.get(BASE_URL + "/es/trx?trx=" + trx +
    "&size=100&sort=-operation_history.sequence",
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    }
  );
}

/* ASSET SERVICE */
// assets
export const fetchActiveAssets = () => {
  return axios.get(BASE_URL + '/assets', {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

export const fetchDexVolume = () => {
  return axios.get(BASE_URL + "/dex_total_volume", {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// daily dex chart
export const fetchDailyDEXChart = () => {
  return axios.get(BASE_URL + "/daily_volume_dex_data", {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
}

// asset detail
export const fetchAssetFull = ({asset_id}) => {
  return axios.get(BASE_URL + '/asset_and_volume?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// asset holders
export const fetchAssetHolders = ({asset_id}) => {
  return axios.get(BASE_URL + '/asset_holders?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// asset holders count
export const fetchAssetHoldersCount = ({asset_id}) => {
  return axios.get(BASE_URL + '/asset_holders_count?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

// asset name & precision
export const fetchAssetNameAndPrecision = ({asset_id}) => {
  return axios.get(BASE_URL + '/asset?asset_id=' + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  });
};

/* MARKET SERVICE */
// asset markets
export const fetchAssetMarkets = ({asset_id}) => {
  return axios.get(BASE_URL + "//markets?asset_id=" + asset_id, {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
}

// most active markets
export const fetchActiveMarkets = () => {
  return axios.get(BASE_URL + "/most_active_markets", {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
}

/* FEE SERVICE */
// fees
export const fetchFees = () => {
  return axios.get(BASE_URL + "/fees", {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
}

/* GOVERNANCE SERVICE */
// committee members
export const fetchCommitteeMembers = () => {
  return axios.get(BASE_URL + "/committee_members", {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
}

// witness
export const fetchWitnesses = () => {
  return axios.get(BASE_URL + "/witnesses", {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
}