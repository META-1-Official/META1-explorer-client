import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

// import components
import {Table} from '../../components/Table';
import Loader from '../../components/Loader/Loader';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

const {fetchBigTransactions} = actions;
const {getBigTransactions, isFetchingBigTransactions} = selectors;

const PageWrapper = styled.div`
  display: flex;
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  padding-left: 270px;
  padding-bottom: 38px;
  padding-right: 270px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
`;

const Transactions = () => {
  // dispatch
  const dispatch = useDispatch();

  const fetchBigTrxs = () => dispatch(fetchBigTransactions());

  // selectors
  const getBigTrxsData = useSelector(getBigTransactions);
  const isFetchingBigTrxs = useSelector(isFetchingBigTransactions);

  // vars
  const headers = ['Transaction ID', 'Operations']; // table headers
  const rows = getBigTrxsData?.map((trx) => {
    return {
      'Transaction ID': [`<a href="/txs/${trx.key}">${trx.key}</a>`, 'html'],
      'Operations': [trx.doc_count, 'plainText'],
    };
  });

  useEffect(() => {
    fetchBigTrxs(); // fetch big trxs
  }, []);

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>Transactions</Label>
        {!isFetchingBigTrxs && rows ? (
          <Table headers={headers} rows={rows}></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Transactions;
