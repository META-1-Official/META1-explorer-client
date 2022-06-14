import { formatBalance, localizeNumber, operationType } from './utility';
import { opText } from '../store/apis/explorer';

export const accountHistoryRowsBuilder = async (rows) => {
  const history = rows.map(async (value) => {
    let timestamp;
    let witness;
    const op = operationType(value.operation_type);
    const op_type = op[0];
    const op_color = op[1];
    const time = new Date(value.block_data.block_time);
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
        ID: [op.operation_id, 'coloredText'],
        'Date and Time': [op.time, 'date'],
        Block: [op.block_num, 'coloredText'],
        Type: [op.op_type, 'label'],
      };
    });
  }
  return [];
};

const buildOpTextPromises = (rows) =>
  rows.map((op) => opText(op.operation_type, op.operation_history.op_object));

export const dashboardRowsBuilder = async (rows) => {
  return rows
    ? Promise.all(buildOpTextPromises(rows)).then((opTxts) => {
        return opTxts.map((opTxt, index) => {
          const op = rows[index];
          return {
            Operation: [opTxt, 'html'],
            ID: [op.account_history.operation_id, 'coloredText'],
            'Date and time': [op.block_data.block_time, 'date'],
            Block: [op.block_data.block_num, 'coloredText'],
            Type: [op.operation_type, 'label'],
          };
        });
      })
    : Promise.resolve([]);
};

export const feesRowsBuilder = (o_data) => {
  if (o_data) {
    let basic_fee = 0;
    let fees = [];
    let fee_params = o_data.parameters.current_fees.parameters;
    for (var i = 0; i < fee_params.length; i++) {
      if (fee_params[i][1].fee) {
        basic_fee = fee_params[i][1].fee;
      } else {
        basic_fee = fee_params[i][1].basic_fee;
      }
      var op_type = operationType(fee_params[i][0]);

      const fee = {
        identifier: fee_params[i][0],
        operation: op_type[0],
        type: fee_params[i][0],
        basic_fee: isNaN(formatBalance(basic_fee, 5))
          ? ''
          : formatBalance(basic_fee, 5),
        premium_fee: isNaN(formatBalance(fee_params[i][1].premium_fee, 5))
          ? ''
          : formatBalance(fee_params[i][1].premium_fee, 5),
        price_per_kbyte: isNaN(
          formatBalance(fee_params[i][1].price_per_kbyte, 5),
        )
          ? ''
          : formatBalance(fee_params[i][1].price_per_kbyte, 5),
      };
      fees.push(fee);
    }
    return fees;
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
