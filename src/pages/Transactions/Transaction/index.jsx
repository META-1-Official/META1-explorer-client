import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Table } from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';

// import api
import { opText } from '../../../store/apis/explorer';

// import helpers
import { buildCustomKVTableDto } from '../../../helpers/utility';

// import redux
import actions from '../../../store/actions';
import selectors from '../../../store/selectors';
import { useTranslation } from 'react-i18next';

const { fetchTransaction } = actions;
const { getTransaction, isFetchingTransaction } = selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    flex-direction: column;
    padding-top: 50px;
  }
`;

const StyledTableContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  width: 65%;

  @media ${(props) => props.theme.bkps.device.mobile} {
    width: 100%;
  }
`;

const StyledMetaDataContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 26px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    width: 100%;
    margin-left: 0;
  }
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
  }
`;

const Transaction = () => {
  const [rows, setRows] = useState([]);
  const { t } = useTranslation();

  // dispatch
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchTrx = (addr) => dispatch(fetchTransaction(addr));

  // selectors
  const getTrx = useSelector(getTransaction);
  const isFetchingTrx = useSelector(isFetchingTransaction);

  // vars
  const headers = ['Operations In Transaction', 'ID', 'Type']; // table headers
  const addr = location.pathname.split('/')[2];
  const metadata = getTrx ? getTrx[0].block_data : null;

  const buildOpTextPromises = (getTrx) =>
    getTrx.map((op) =>
      opText(op.operation_type, op.operation_history.op_object),
    );

  const getRows = async () => {
    if (!getTrx) return [];

    const opTxts = await Promise.all(buildOpTextPromises(getTrx));
    const uniqueIds = new Set();
    const filteredRows = opTxts.map((opTxt, index) => {
      const op = getTrx[index];
      const operationId = op.account_history.operation_id;

      if (!uniqueIds.has(operationId)) {
        uniqueIds.add(operationId);
        return {
          'Operations In Transaction': [opTxt, 'html'],
          ID: [operationId, 'coloredText'],
          Type: [op.operation_type, 'label'],
        };
      }

      return null;
    });

    return filteredRows.filter(Boolean);
  };

  const getMetadataRows = () => {
    const headers = [
      { 'Hash table_key': 'trx_id', type: 'plainText' },
      { 'Block table_key': 'block_num', type: 'coloredText' },
      { 'Date table_key': 'block_time', type: 'timeStamp' },
    ];

    const kvTable = buildCustomKVTableDto(metadata, headers) || [];
    kvTable.push({
      Key: ['Operations table_key:', 'plainText'],
      Value: [rows ? rows.length : 0, 'plainText'],
    });

    return kvTable;
  };

  useEffect(() => {
    fetchTrx(addr);
  }, []);

  useEffect(() => {
    if (getTrx && !rows.length) {
      getRows().then((rws) => setRows(rws));
    }
  }, [getTrx, rows]);

  return (
    <PageWrapper>
      <StyledTableContainer>
        <Label>{t('Operations In Transaction')}</Label>
        <Table headers={headers} rows={rows} lastcellaligned={true} />
        {isFetchingTrx || (!rows.length && <Loader />)}
      </StyledTableContainer>
      <StyledMetaDataContainer>
        <Label>{t('Transaction Data')}</Label>
        <Table
          headers={['Key', 'Value']}
          rows={getMetadataRows()}
          lastcellaligned={false}
        />
        {isFetchingTrx && <Loader />}
      </StyledMetaDataContainer>
    </PageWrapper>
  );
};

export default Transaction;
