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

export const getGOB = (data, quote_precision, base_precision) => {
  return data.map((value) => {
    const total_for_sale = value.total_for_sale;
    const maxBaseAmount = parseInt(value.max_price.base.amount);
    const maxQuoteAmount = parseInt(value.max_price.quote.amount);
    const minBaseAmount = parseInt(value.min_price.base.amount);
    const minQuoteAmount = parseInt(value.min_price.quote.amount);

    const base_id = value.max_price.base.asset_id;
    const quote_id = value.max_price.quote.asset_id;

    const divide =
      parseInt(base_id.split('.')[2]) > parseInt(quote_id.split('.')[2]);
    const qp = Math.pow(10, parseInt(quote_precision));
    const bp = Math.pow(10, parseInt(base_precision));

    const maxBase = maxBaseAmount / bp;
    const maxQuote = maxQuoteAmount / qp;
    const minBase = minBaseAmount / bp;
    const minQuote = minQuoteAmount / qp;

    const max_price = divide ? 1 / (maxQuote / maxBase) : maxBase / maxQuote;
    const min_price = divide ? 1 / (minQuote / minBase) : minBase / minQuote;

    return {
      max_price,
      min_price,
      total_for_sale: total_for_sale / bp,
      base_precision,
      quote_precision,
    };
  });
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
  const opType = Number(_opType);
  let name;
  let color;
  let textColor = 'ffffff';

  if (opType >= 0 && opType <= 58) {
    const colors1 = ['81CA80', '6BBCD7', 'E9C842', 'E96562', '008000']; // 0, 1, 2, 3, 4
    const colors2 = ['9932CC', 'FF007F', 'FB8817', '552AFF', 'AA2AFF']; // 5, 6, 7, 8, 9
    const colors3 = ['D400FF', '0000FF', 'AA7FFF', '2A7FFF', '7FAAFF']; // 10, 11, 12, 13, 14
    const colors4 = ['55FF7F', '55FF7F', 'F1CFBB', 'F1DFCC', 'FF2A55']; // 15, 16, 17, 18, 19
    const colors5 = ['FFAA7F', 'F1AA2A', 'FFAA55', 'FF7F55', 'FF552A']; // 20, 21, 22, 23, 24
    const colors6 = ['FF00AA', 'FF00FF', 'FF0055', '37B68C', '37B68C']; // 25, 26, 27, 28, 29
    const colors7 = ['6712E7', 'B637B6', 'A5A5A5', '696969', '0F0F0F']; // 30, 31, 32, 33, 34
    const colors8 = ['0DB762', 'D1EEFF', '939314', '8D0DB7', 'C4EFC4']; // 35, 36, 37, 38, 39
    const colors9 = ['F29DF2', '9D9DF2', '4ECEF8', 'F8794E', '8808B2']; // 40, 41, 42, 43, 44
    const colors10 = ['6012B1', '1D04BB', 'AAF654', 'AB7781', '11e0dc']; // 45, 46, 47, 48, 49
    const colors11 = ['085957', 'AB7781', '093f3e', '369694', '169524']; // 50, 51, 52, 53, 54
    const colors12 = ['169524', '169524', '169524', 'FF2A55']; // 55, 56, 57, 58

    const colors = [
      ...colors1,
      ...colors2,
      ...colors3,
      ...colors4,
      ...colors5,
      ...colors6,
      ...colors7,
      ...colors8,
      ...colors9,
      ...colors10,
      ...colors11,
      ...colors12,
    ];

    name = opMapping[opType];
    color = colors[opType];
  } else {
    name = 'UNKNOWN (' + opType + ')';
    color = '369694';
  }

  return [name, color, textColor];
};

const isInteger = (value) => {
  return /^\d+$/.test(value);
};

const toFixedFloatNumber = (digit, precision) => {
  return digit.toFixed(precision).replace(/\.?0+$/, '');
};

export function filterDuplicatesByProperty(array, property) {
  const existed = new Set();
  return array.filter((item) => {
    const value = item[property];
    if (!existed.has(value)) {
      existed.add(value);
      return item;
    }
  });
}

export const buildCustomKVTableDto = (data, headerM) => {
  if (!data) return [];

  const formatValue = (key, value, precision, symbol) => {
    const divider = Math.pow(10, precision);
    const isMeta1 = symbol === 'META1';

    if (!isInteger(value)) {
      return value;
    }

    switch (key) {
      case 'Accumulated fees':
        return localizeNumber(
          toFixedFloatNumber(
            value /
              (isMeta1
                ? divider
                : data?.options?.core_exchange_rate?.base?.amount),
            precision,
          ),
        );
      case 'Fee pool':
        return `${localizeNumber(
          toFixedFloatNumber(
            value /
              (isMeta1
                ? divider
                : data?.options?.core_exchange_rate?.base?.amount),
            precision,
          ),
        )} META1`;
      case 'Max supply':
      case 'Current supply':
        return localizeNumber(parseInt(value / divider));
      default:
        return localizeNumber(parseInt(value));
    }
  };

  return headerM.map((item) => {
    const key = Object.keys(item)[0];
    const valuePath = item[key].split('.');
    const value =
      valuePath.length === 1
        ? data[valuePath[0]]
        : data[valuePath[0]][valuePath[1]];

    const formattedValue = formatValue(key, value, data.precision, data.symbol);

    const formattedKey = [key + ':', 'plainText'];
    const formattedType = item.type;
    const formattedLink =
      item.type === 'html'
        ? `<a href='${item.link}'>${formattedValue}</a>`
        : formattedValue;

    return {
      Key: formattedKey,
      Value: [formattedLink, formattedType],
    };
  });
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

export const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDateObj = new Date(birthdate);
  const aIM = today - birthDateObj; // age in milliseconds

  // Convert milliseconds to days, hours, minutes, and seconds
  const days = Math.floor(aIM / (1000 * 60 * 60 * 24));
  const hours = Math.floor((aIM % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((aIM % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((aIM % (1000 * 60)) / 1000);

  // Format the age
  const fp = []; // formatted parts
  if (days > 0) fp.push(`${days} days`);
  if (hours > 0 || days > 0) fp.push(`${hours} hrs`);
  if (hours === 0 && (minutes > 0 || days === 0)) fp.push(`${minutes} mins`);
  if (hours === 0 && minutes === 0 && (seconds > 0 || days === 0))
    fp.push(`${seconds} secs`);

  return fp.length > 0 ? fp.join(' ') + ' ago' : '0 secs ago';
};

export const getUTCOffset = () => {
  const now = new Date(); // local date
  const utcOffset = -now.getTimezoneOffset() / 60;

  return 'UTC' + (utcOffset > 0 ? '+' : '-') + utcOffset;
};
