import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';

const { fetchBigTransactions } = actions;
const { getBigTransactions, isFetchingBigTransactions } = selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 38px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding-top: 50px;
  }
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Transactions = () => {
  // dispatch
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchBigTrxs = () => dispatch(fetchBigTransactions());

  // selectors
  const getBigTrxsData = useSelector(getBigTransactions);
  const isFetchingBigTrxs = useSelector(isFetchingBigTransactions);

  // vars
  const headers = ['Transaction ID', 'Operations']; // table headers
  const rows = getBigTrxsData
    ?.filter((trx) => !!trx.key)
    .map((trx) => {
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
        <PageLabel>{t('TRANSACTIONS')}</PageLabel>
        {!isFetchingBigTrxs && rows ? (
          <Table
            headers={headers}
            headerText={'BIGGEST TRANSACTIONS IN THE LAST 1 HOUR'}
            rows={rows}
          ></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Transactions;
