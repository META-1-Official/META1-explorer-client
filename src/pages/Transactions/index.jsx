import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import {
  PageWrapper,
  PaginationWrapper,
  StyledContainer,
} from './Transactions.styles';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';
import PaginationSelect from '../../components/AppPagination/PaginationSelect';

const { fetchBigTransactions } = actions;
const { getBigTransactions, isFetchingBigTransactions } = selectors;

const Transactions = () => {
  // dispatch
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const fetchBigTrxs = (size) => dispatch(fetchBigTransactions(size));

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
    fetchBigTrxs(rowsPerPage); // fetch big trxs
  }, [rowsPerPage]);

  return (
    <PageWrapper>
      <StyledContainer>
        <PageLabel>{t('TRANSACTIONS')}</PageLabel>
        {!isFetchingBigTrxs && rows ? (
          <>
            <Table
              headers={headers}
              headerText={'BIGGEST TRANSACTIONS IN THE LAST 1 HOUR'}
              rows={rows}
            ></Table>
            <PaginationWrapper>
              <PaginationSelect
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
              />
            </PaginationWrapper>
          </>
        ) : (
          <Loader />
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Transactions;
