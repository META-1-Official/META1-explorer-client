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
import EmptyResultsBlock from '../../components/EmptyResultsBlock';

const { fetchBigTransactions } = actions;
const { getBigTransactions, isFetchingBigTransactions } = selectors;

const Transactions = () => {
  // dispatch
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [query, setQuery] = useState('');

  const fetchBigTrxs = (size) => dispatch(fetchBigTransactions(size));

  // selectors
  const getBigTrxsData = useSelector(getBigTransactions);
  const isFetchingBigTrxs = useSelector(isFetchingBigTransactions);

  // vars
  const headers = ['Transaction ID', 'Operations']; // table headers
  const rows = getBigTrxsData
    ?.filter((trx) => !!trx.key && trx.key.startsWith(query))
    .map((trx) => {
      return {
        'Transaction ID': [`<a href="/txs/${trx.key}">${trx.key}</a>`, 'html'],
        Operations: [trx.doc_count, 'plainText'],
      };
    });

  const onSearch = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    fetchBigTrxs(rowsPerPage); // fetch big trxs
  }, [rowsPerPage]);

  return (
    <PageWrapper>
      <StyledContainer>
        <PageLabel>{t('TRANSACTIONS')}</PageLabel>
        {isFetchingBigTrxs && <Loader />}
        {!isFetchingBigTrxs && rows && (
          <>
            <Table
              withSearch
              searchText={'Search for Transaction Hash'}
              headers={headers}
              headerText={'BIGGEST TRANSACTIONS'}
              rows={rows}
              onSearch={onSearch}
            ></Table>
            {!isFetchingBigTrxs && !rows?.length && <EmptyResultsBlock />}
            <PaginationWrapper>
              <PaginationSelect
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
              />
            </PaginationWrapper>
          </>
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Transactions;
