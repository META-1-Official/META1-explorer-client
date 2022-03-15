import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

import {Table} from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';

// import api
import {opText} from '../../../store/apis/explorer';

// import helpers
import { buildCustomKVTableDto } from '../../../helpers/utility';

// import redux
import actions from '../../../store/actions';
import selectors from '../../../store/selectors';

const {fetchTransaction} = actions;
const {getTransaction, isFetchingTransaction} = selectors;

const PageWrapper = styled.div`
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
    let headerM = [{Hash: 'trx_id', type: 'plainText'}, {Block: 'block_num', type: 'coloredText'}, {Date: 'block_time', type: 'plainText'}];

    let rows = buildCustomKVTableDto(metadata, headerM);

    rows.push({
      Key: ['Operations:', 'plainText'],
      Value: [getTrx ? getTrx.length : 0, 'plainText'],
    });

    return rows;
  };

  useEffect(() => {
    fetchTrx(addr);
  }, []);

  const [v, setV] = useState(false); // the flag var for fethcing for only change
  useEffect(() => {
    if (getTrx && !v) {
      setV(true);
      getRows().then((rws) => setRows(rws));
    }
  }, [getTrx]);

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default Transaction;
