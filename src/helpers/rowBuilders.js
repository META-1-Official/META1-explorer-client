import { localizeNumber, operationType } from './utility';
import { opText } from '../store/apis/explorer';
import images from './images';

const NAME_MAPPING = {
  fee: 'Regular Transaction Fee',
  symbol3: 'Symbols with 3 Characters',
  symbol4: 'Symbols with 4 Characters',
  long_symbol: 'Longer Symbol',
  basic_fee: 'Basic Fee',
  premium_fee: 'Fee for Premium Names',
  membership_lifetime_fee: 'Lifetime Membership',
  membership_annual_fee: 'Lifetime Membership Annual Fee',
  price_per_output: 'Price per recipient',
  price_per_kbyte: 'Price per KByte Transaction Size',
};

const lifetimeFeeRate = 2.5;

const coloredLinksHistoryRows = (arg, type) => {
  return (
    <a
      style={{ color: '#FFC000', fontWeight: 500, textDecoration: 'none' }}
      href={`/${type === 'ID' ? 'objects' : 'blocks'}/${arg}`}
    >
      {arg}
    </a>
  );
};

export const accountHistoryRowsBuilder = async (rows) => {
  const history = rows.map(async (value) => {
    let timestamp;
    let witness;
    const op = operationType(value.operation_type);
    const op_type = op[0];
    const op_color = op[1];
    const time = new Date(value.block_data.block_time + 'Z');
    timestamp = time.toLocaleString();
    witness = value.witness;
    const parsed_op = value.operation_history.op_object;
    const operation = {
      operation_id: value.account_history.operation_id,
      block_num: value.block_data.block_num,
      operation_id_num: value.operation_id_num,
      time: timestamp,
      witness: witness,
      op_type: value.operation_type,
      op_color: op_color,
    };
    const op_text = await opText(value.operation_type, parsed_op);
    operation.operation_text = op_text;
    return operation;
  });
  const promises = await Promise.all(history);
  if (promises.length) {
    return promises.map((op) => {
      return {
        Operation: [op.operation_text, 'html'],
        ID: [coloredLinksHistoryRows(op.operation_id, 'ID'), 'coloredText'],
        'Date and Time': [op.time, 'date'],
        Block: [coloredLinksHistoryRows(op.block_num, 'BLOCK'), 'coloredText'],
        Type: [op.op_type, 'label'],
      };
    });
  }
  return [];
};

const buildOpTextPromises = (rows) =>
  rows.map((op) =>
    opText(
      op.operation_type,
      op.operation_history.op_object,
      op.account_history.account,
    ),
  );

export const dashboardRowsBuilder = async (rows) => {
  return rows
    ? Promise.all(buildOpTextPromises(rows)).then((opTxts) => {
        return opTxts.map((opTxt, index) => {
          const op = rows[index];
          return {
            Operation: [opTxt, 'html'],
            ID: [
              coloredLinksHistoryRows(op.account_history.operation_id, 'ID'),
              'coloredText',
            ],
            'Date and Time': [op.block_data.block_time, 'date'],
            Block: [
              coloredLinksHistoryRows(op.block_data.block_num, 'BLOCK'),
              'coloredText',
            ],
            Type: [op.operation_type, 'label'],
          };
        });
      })
    : Promise.resolve([]);
};

export const feesRowsBuilder = (feesData, precision) => {
  if (feesData) {
    return feesData.flatMap((fee) => {
      return Object.entries(fee[1])
        .reverse()
        .map(([key, value], count) => {
          return {
            typesCount: ++count,
            type: fee[0],
            operation: operationType(fee[0])[0],
            name: NAME_MAPPING[key] || key,
            baseFee: value / 10 ** precision,
            lifetimeMemberFee:
              key !== 'membership_annual_fee' &&
              key !== 'membership_lifetime_fee'
                ? value / lifetimeFeeRate / 10 ** precision
                : 0,
          };
        })
        .reverse();
    });
  } else {
    return [];
  }
};

export const witnessesRowsBuilder = (sortedData) => {
  return sortedData?.map((witness) => {
    return {
      Position: [witness.position, 'plainText'],
      ID: [`<a href="/objects/${witness.id}">${witness.id}</a>`, 'html'],
      Account: [
        `<a href="/objects/${witness.id}">${witness.witness_account_name}</a>`,
        'html',
      ],
      URL: witness.url ? [witness.url, 'urlLink'] : '',
      'Total Votes': [localizeNumber(witness.total_votes), 'plainText'],
      Missed: [localizeNumber(witness.total_missed), 'plainText'],
      'Last confirmed block': [
        `<a href="/blocks/${witness.last_confirmed_block_num}">${localizeNumber(
          witness.last_confirmed_block_num,
        )}</a>`,
        'html',
      ],
    };
  });
};

export const assetRowsBuilder = (rows) => {
  return rows?.length
    ? rows.map((value) => {
        let precision = 100000;
        if (value.precision) {
          precision = Math.pow(10, value.precision);
        }
        return {
          Name: [
            `<img src='${
              images[`coin-${value.asset_name.toLowerCase()}`]
            }'><a href='/assets/${value.asset_id}'>${value.asset_name}</a>`,
            'html',
          ],
          Price: [`${value.latest_price} META1`, 'plainText'],
          '24H Volume': [
            `${Math.round(value['24h_volume'])} META1`,
            'plainText',
          ],
          'Market Cap': [
            `${localizeNumber(Math.round(value.market_cap / 100000))} META1`,
            'plainText',
          ],
          Supply: [
            localizeNumber(Math.round(value.current_supply / precision)),
            'plainText',
          ],
          Holders: [localizeNumber(value.holders_count), 'plainText'],
        };
      })
    : [];
};
