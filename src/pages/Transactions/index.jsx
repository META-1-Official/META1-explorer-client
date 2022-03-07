import React, {useEffect} from 'react';
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
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 38px;
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};  
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
  margin-bottom: 10px;
  margin-top: 10px;
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
      Operations: [trx.doc_count, 'plainText'],
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
