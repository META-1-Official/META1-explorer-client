import { instanceOf } from 'prop-types';

export const localizeNumber = (number, locale = 'en') => {
  return Number(number).toLocaleString(locale);
};

export const formatNumber = (x) => {
  try {
    var parts = x.toString().split('.');

    if (x < 1) {
      // parts[1] = parts[1];
    } else if (x > 1 && x < 100) {
      parts[1] = parts[1].substr(0, 2);
    } else if (x > 100 && x < 1000) {
      parts[1] = parts[1].substr(0, 1);
    } else if (x > 1000) {
      parts[1] = '';
    }

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (x > 1000) {
      return parts[0];
    } else {
      return parts.join('.');
    }
  } catch (err) {
    return x;
  }
};

export const formatBalance = (number, presicion) => {
  const divideby = Math.pow(10, presicion);
  return Number(number / divideby);
};

export const group = (items, n) =>
  items.reduce((acc, x, i) => {
    const idx = Math.floor(i / n);
    acc[idx] = [...(acc[idx] || []), x];
    return acc;
  }, []);

export const objectType = (id) => {
  var parts = id.split('.');
  var object_type = '';
  if (parts[0] === '1' && parts[1] === '1') object_type = 'BASE';
  else if (parts[0] === '1' && parts[1] === '2') object_type = 'ACCOUNT';
  else if (parts[0] === '1' && parts[1] === '3') object_type = 'ASSET';
  else if (parts[0] === '1' && parts[1] === '4')
    object_type = 'FORCE SETTLEMENT';
  else if (parts[0] === '1' && parts[1] === '5')
    object_type = 'COMMITTEE MEMBER';
  else if (parts[0] === '1' && parts[1] === '6') object_type = 'WITNESS';
  else if (parts[0] === '1' && parts[1] === '7') object_type = 'LIMIT ORDER';
  else if (parts[0] === '1' && parts[1] === '8') object_type = 'CALL ORDER';
  else if (parts[0] === '1' && parts[1] === '9') object_type = 'CUSTOM';
  else if (parts[0] === '1' && parts[1] === '10') object_type = 'PROPOSAL';
  else if (parts[0] === '1' && parts[1] === '11')
    object_type = 'OPERATION HISTORY';
  else if (parts[0] === '1' && parts[1] === '12')
    object_type = 'WITHDRAW PERMISSION';
  else if (parts[0] === '1' && parts[1] === '13')
    object_type = 'VESTING BALANCE';
  else if (parts[0] === '1' && parts[1] === '14') object_type = 'WORKER';
  else if (parts[0] === '1' && parts[1] === '15') object_type = 'BALANCE';
  else if (parts[0] === '1' && parts[1] === '16') object_type = 'HTLC';
  else if (parts[0] === '2' && parts[1] === '0')
    object_type = 'GLOBAL PROPERTY';
  else if (parts[0] === '2' && parts[1] === '1')
    object_type = 'DYNAMIC GLOBAL PROPERTY';
  else if (parts[0] === '2' && parts[1] === '3')
    object_type = 'ASSET DYNAMIC DATA';
  else if (parts[0] === '2' && parts[1] === '4')
    object_type = 'ASSET BITASSET DATA';
  else if (parts[0] === '2' && parts[1] === '5')
    object_type = 'ACCOUNT BALANCE';
  else if (parts[0] === '2' && parts[1] === '6')
    object_type = 'ACCOUNT STATISTICS';
  else if (parts[0] === '2' && parts[1] === '7') object_type = 'TRANSACTION';
  else if (parts[0] === '2' && parts[1] === '8') object_type = 'BLOCK SUMMARY';
  else if (parts[0] === '2' && parts[1] === '9')
    object_type = 'ACCOUNT TRANSACTION HISTORY';
  else if (parts[0] === '2' && parts[1] === '10')
    object_type = 'BLINDED BALANCE';
  else if (parts[0] === '2' && parts[1] === '11')
    object_type = 'CHAIN PROPERTY';
  else if (parts[0] === '2' && parts[1] === '12')
    object_type = 'WITNESS SCHEDULE';
  else if (parts[0] === '2' && parts[1] === '13') object_type = 'BUDGET RECORD';
  else if (parts[0] === '2' && parts[1] === '14')
    object_type = 'SPECIAL AUTHORITY';

  return object_type;
};

export const opMapping = {
  0: 'TRANSFER',
  1: 'ORDER CREATE',
  2: 'ORDER CANCEL',
  3: 'CALL ORDER UPDATE',
  4: 'FILL ORDER',
  5: 'ACCOUNT CREATE',
  6: 'ACCOUNT UPDATE',
  7: 'ACCOUNT WHITELIST',
  8: 'ACCOUNT UPGRADE',
  9: 'ACCOUNT TRANSFER',
  10: 'ASSET CREATE',
  11: 'ASSET UPDATE',
  12: 'ASSET UPDATE BITASSET',
  13: 'ASSET UPDATE FEED PRODUCERS',
  14: 'ASSET ISSUE',
  15: 'ASSET RESERVE',
  16: 'ASSET FUND FEE POOL',
  17: 'ASSET SETTLE',
  18: 'ASSET GLOBAL SETTLE',
  19: 'ASSET PUBLISH FEED',
  20: 'WITNESS CREATE',
  21: 'WITNESS UPDATE',
  22: 'PROPOSAL CREATE',
  23: 'PROPOSAL UPDATE',
  24: 'PROPOSAL DELETE',
  25: 'WITHDRAW PERMISSION CREATE',
  26: 'WITHDRAW PERMISSION',
  27: 'WITHDRAW PERMISSION CLAIM',
  28: 'WITHDRAW PERMISSION DELETE',
  29: 'COMMITTEE MEMBER CREATE',
  30: 'COMMITTEE MEMBER UPDATE',
  31: 'COMMITTEE MEMBER UPDATE GLOBAL PARAMETERS',
  32: 'VESTING BALANCE CREATE',
  33: 'VESTING BALANCE WITHDRAW',
  34: 'WORKER CREATE',
  35: 'CUSTOM',
  36: 'ASSERT',
  37: 'BALANCE CLAIM',
  38: 'OVERRIDE TRANSFER',
  39: 'TRANSFER TO BLIND',
  40: 'BLIND TRANSFER',
  41: 'TRANSFER FROM BLIND',
  42: 'ASSET SETTLE CANCEL',
  43: 'ASSET CLAIM FEES',
  44: 'FBA DISTRIBUTE',
  45: 'BID COLLATERAL',
  46: 'EXECUTE BID',
  47: 'ASSET CLAIM POOL',
  48: 'ASSET UPDATE ISSUER',
  49: 'HTLC CREATE',
  50: 'HTLC REDEEM',
  51: 'HTLC REDEEMED',
  52: 'HTLC EXTEND',
  53: 'HTLC REFUND',
  54: 'PROPERTY CREATE',
  55: 'PROPERTY UPDATE',
  56: 'PROPERTY APPROVE',
  57: 'PROPERTY DELETE',
  58: 'ASSET PRICE PUBLISH',
};

export const operationType = (_opType) => {
  var name;
  var color;
  var results = [];
  var opType = Number(_opType);
  if (opType === 0) {
    name = opMapping[0];
    color = '81CA80';
  } else if (opType === 1) {
    name = opMapping[1];
    color = '6BBCD7';
  } else if (opType === 2) {
    name = opMapping[2];
    color = 'E9C842';
  } else if (opType === 3) {
    name = opMapping[3];
    color = 'E96562';
  } else if (opType === 4) {
    name = opMapping[4];
    color = '008000';
  } else if (opType === 5) {
    name = opMapping[5];
    color = 'CCCCCC';
  } else if (opType === 6) {
    name = opMapping[6];
    color = 'FF007F';
  } else if (opType === 7) {
    name = opMapping[7];
    color = 'FB8817';
  } else if (opType === 8) {
    name = opMapping[8];
    color = '552AFF';
  } else if (opType === 9) {
    name = opMapping[9];
    color = 'AA2AFF';
  } else if (opType === 10) {
    name = opMapping[10];
    color = 'D400FF';
  } else if (opType === 11) {
    name = opMapping[11];
    color = '0000FF';
  } else if (opType === 12) {
    name = opMapping[12];
    color = 'AA7FFF';
  } else if (opType === 13) {
    name = opMapping[13];
    color = '2A7FFF';
  } else if (opType === 14) {
    name = opMapping[14];
    color = '7FAAFF';
  } else if (opType === 15) {
    name = opMapping[15];
    color = '55FF7F';
  } else if (opType === 16) {
    name = opMapping[16];
    color = '55FF7F';
  } else if (opType === 17) {
    name = opMapping[17];
    color = 'F1CFBB';
  } else if (opType === 18) {
    name = opMapping[18];
    color = 'F1DFCC';
  } else if (opType === 19) {
    name = opMapping[19];
    color = 'FF2A55';
  } else if (opType === 20) {
    name = opMapping[20];
    color = 'FFAA7F';
  } else if (opType === 21) {
    name = opMapping[21];
    color = 'F1AA2A';
  } else if (opType === 22) {
    name = opMapping[22];
    color = 'FFAA55';
  } else if (opType === 23) {
    name = opMapping[23];
    color = 'FF7F55';
  } else if (opType === 24) {
    name = opMapping[24];
    color = 'FF552A';
  } else if (opType === 25) {
    name = opMapping[25];
    color = 'FF00AA';
  } else if (opType === 26) {
    name = opMapping[26];
    color = 'FF00FF';
  } else if (opType === 27) {
    name = opMapping[27];
    color = 'FF0055';
  } else if (opType === 28) {
    name = opMapping[28];
    color = '37B68C';
  } else if (opType === 29) {
    name = opMapping[29];
    color = '37B68C';
  } else if (opType === 30) {
    name = opMapping[30];
    color = '6712E7';
  } else if (opType === 31) {
    name = opMapping[31];
    color = 'B637B6';
  } else if (opType === 32) {
    name = opMapping[32];
    color = 'A5A5A5';
  } else if (opType === 33) {
    name = opMapping[33];
    color = '696969';
  } else if (opType === 34) {
    name = opMapping[34];
    color = '0F0F0F';
  } else if (opType === 35) {
    name = opMapping[35];
    color = '0DB762';
  } else if (opType === 36) {
    name = opMapping[36];
    color = 'D1EEFF';
  } else if (opType === 37) {
    name = opMapping[37];
    color = '939314';
  } else if (opType === 38) {
    name = opMapping[38];
    color = '8D0DB7';
  } else if (opType === 39) {
    name = opMapping[39];
    color = 'C4EFC4';
  } else if (opType === 40) {
    name = opMapping[40];
    color = 'F29DF2';
  } else if (opType === 41) {
    name = opMapping[41];
    color = '9D9DF2';
  } else if (opType === 42) {
    name = opMapping[42];
    color = '4ECEF8';
  } else if (opType === 43) {
    name = opMapping[43];
    color = 'F8794E';
  } else if (opType === 44) {
    name = opMapping[44];
    color = '8808B2';
  } else if (opType === 45) {
    name = opMapping[45];
    color = '6012B1';
  } else if (opType === 46) {
    name = opMapping[46];
    color = '1D04BB';
  } else if (opType === 47) {
    name = opMapping[47];
    color = 'AAF654';
  } else if (opType === 48) {
    name = opMapping[48];
    color = 'AB7781';
  } else if (opType === 49) {
    name = opMapping[49];
    color = '11e0dc';
  } else if (opType === 50) {
    name = opMapping[50];
    color = '085957';
  } else if (opType === 51) {
    name = opMapping[51];
    color = 'AB7781';
  } else if (opType === 52) {
    name = opMapping[52];
    color = '093f3e';
  } else if (opType === 53) {
    name = opMapping[53];
    color = '369694';
  } else if (opType === 54) {
    name = opMapping[54];
    color = '169524';
  } else if (opType === 55) {
    name = opMapping[55];
    color = '169524';
  } else if (opType === 56) {
    name = opMapping[56];
    color = '169524';
  } else if (opType === 57) {
    name = opMapping[57];
    color = '169524';
  } else if (opType === 58) {
    name = opMapping[58];
    color = 'FF2A55';
  } else {
    name = 'UNKNOWN (' + opType + ')';
    color = '369694';
  }

  results[0] = name;
  results[1] = color;

  return results;
};

const isInteger = (value) => {
  return /^\d+$/.test(value);
};

export const buildCustomKVTableDto = (data, headerM, meta1?) => {
  let rows = data
    ? headerM.map((item) => {
        let key = Object.keys(item)[0];
        let tmp = item[key].split('.');
        let val_data = tmp.length !== 1 ? data[tmp[0]][tmp[1]] : data[tmp[0]];
        let dividermeta1 = data.options.core_exchange_rate.base.amount;
        let divider = Math.pow(10, data.precision);
        let formattedVal = isInteger(val_data)
          ? key === 'Fee pool'
            ? (val_data / dividermeta1).toFixed(6)
            : localizeNumber(parseInt(divider ? val_data / divider : val_data))
          : val_data;
        return {
          Key: [key + ':', 'plainText'],
          Value: [
            item.type === 'html'
              ? `<a href='${item.link}'>${formattedVal}</a>`
              : formattedVal, // in case of html, build <a> tag html code
            item.type,
          ],
        };
      })
    : [];
  return rows;
};

// added total field as last feild (total = sum of first value in each element)
export const addTotalFieldToJsonArray = (arry) => {
  if (Object.keys(arry[0]).includes('total')) return arry;
  let total = 0;
  return arry.map((ele) => {
    let keys = Object.keys(ele);
    total += Number(ele[keys[0]]);
    ele['total'] = total;
    return ele;
  });
};

//
export const parseGroupOrdersBook = (data, quote_precision, base_precision) => {
  return data.map((value) => {
    let total_for_sale = value.total_for_sale;
    const max_base_amount = parseInt(value.max_price.base.amount);
    const max_quote_amount = parseInt(value.max_price.quote.amount);
    const min_base_amount = parseInt(value.min_price.base.amount);
    const min_quote_amount = parseInt(value.min_price.quote.amount);

    const base_id = value.max_price.base.asset_id;
    const quote_id = value.max_price.quote.asset_id;

    const base_array = base_id.split('.');
    const quote_array = quote_id.split('.');
    let divide = 0;

    if (base_array[2] > quote_array[2]) {
      divide = 1;
    }
    const qp = Math.pow(10, parseInt(quote_precision));
    const bp = Math.pow(10, parseInt(base_precision));

    let max_price;
    let min_price;
    let min;
    let max;
    if (divide) {
      max = max_quote_amount / qp / (max_base_amount / bp);
      max_price = 1 / max;
      min = min_quote_amount / qp / (min_base_amount / bp);
      min_price = 1 / min;
    } else {
      max_price =
        parseFloat(max_base_amount / bp) / parseFloat(max_quote_amount / qp);
      min_price =
        parseFloat(min_base_amount / bp) / parseFloat(min_quote_amount / qp);
    }
    total_for_sale = Number(total_for_sale / bp);

    return {
      max_price: max_price,
      min_price: min_price,
      total_for_sale: total_for_sale,
      base_precision: base_precision,
      quote_precision: quote_precision,
    };
  });
};
