import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import {Table} from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';

// import api
import {opText} from '../../../store/apis/explorer';

// import redux
import actions from '../../../store/actions';
import selectors from '../../../store/selectors';

const {fetchTransaction} = actions;
const {getTransaction, isFetchingTransaction} = selectors;

const TwoColumnPageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;
`;

const StyledTableContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  width: 65%;
`;

const StyledMetaDataContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 26px;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
`;

const Transaction = () => {
  const [rows, setRows] = useState([]);

  // dispatch
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchTrx = (addr) => dispatch(fetchTransaction(addr));

  // selectors
  const getTrx = useSelector(getTransaction);
  const isFetchingTrx = useSelector(isFetchingTransaction);

  // vars
  const headers = ['Operation in transaction', 'ID', 'Type']; // table headers
  const addr = location.pathname.split('/')[2];
  const metadata = getTrx ? getTrx[0].block_data : null;

  const buildOpTextPromises = (getTrx) =>
    getTrx.map((op) =>
      opText(op.operation_type, op.operation_history.op_object),
    );

  const getRows = () => {
    return getTrx
      ? Promise.all(buildOpTextPromises(getTrx)).then((opTxts) => {
          return opTxts.map((opTxt, index) => {
            const op = getTrx[index];
            return {
              'Operation in transaction': [opTxt, 'html'],
              ID: [op.account_history.operation_id, 'coloredText'],
              Type: [op.operation_type, 'label'],
            };
          });
        })
      : Promise.resolve([]);
  };

  const getMetadataRows = () => {
    let tmp = [{Hash: 'trx_id'}, {Block: 'block_num'}, {Date: 'block_time'}];

    let rows = metadata
      ? tmp.map((item, index) => {
          let key = Object.keys(item)[0];
          return {
            Key: [key + ':', 'plainText'],
            Value: [
              metadata[item[key]],
              index !== 1 ? 'plainText' : 'coloredText',
            ],
          };
        })
      : [];

    rows.push({
      Key: ['Operations in transaction:', 'plainText'],
      Value: [getTrx ? getTrx.length : 0, 'plainText'],
    });

    return rows;
  };

  useEffect(() => {
    dispatch(fetchTransaction(addr));
  }, []);

  const [v, setV] = useState(false); // the flag var for fethcing for only change
  useEffect(() => {
    if (getTrx && !v) {
      setV(true);
      getRows().then((rws) => setRows(rws));
    }
  }, [getTrx]);

  return (
    <TwoColumnPageWrapper>
      <StyledTableContainer>
        <Label>Operations In Transaction</Label>
        <Table headers={headers} rows={rows} lastcellaligned={false}></Table>
        {(isFetchingTrx || rows.length === 0) && <Loader />}
      </StyledTableContainer>
      <StyledMetaDataContainer>
        <Label>Transaction Data</Label>
        <Table
          headers={['Key', 'Value']}
          rows={getMetadataRows()}
          lastcellaligned={false}
        ></Table>
        {isFetchingTrx && <Loader />}
      </StyledMetaDataContainer>
    </TwoColumnPageWrapper>
  );
};

export default Transaction;
