import { operationType } from './utility';
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
        'Date and Time': [op.time, 'plainText'],
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
            'Date and time': [op.block_data.block_time, 'plainText'],
            Block: [op.block_data.block_num, 'coloredText'],
            Type: [op.operation_type, 'label'],
          };
        });
      })
    : Promise.resolve([]);
};
