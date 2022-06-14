import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as styled from './Fees.styles';

import Pagination from '@mui/material/Pagination';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import { SearchBox } from '../../components/SearchBox';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';
import { feesRowsBuilder } from '../../helpers/rowBuilders';

const { fetchFees } = actions;
const { getFees, isFetchingFees } = selectors;

const Fees = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { t } = useTranslation();
  // dispatch
  const dispatch = useDispatch();

  const fetchFeesData = () => dispatch(fetchFees());

  // selectors
  const getFeesData = useSelector(getFees);
  const isFetchingFeesData = useSelector(isFetchingFees);

  // const functions

  // vars
  const filteredData = feesRowsBuilder(getFeesData)?.filter((data) =>
    data.operation.includes(query.toUpperCase()),
  );

  const curPageOps =
    filteredData?.length > 20
      ? filteredData?.slice((page - 1) * 20, page * 20)
      : filteredData; // current page markets - 20 markets per page
  const totalPages =
    filteredData?.length === 0 ? 1 : Math.floor(filteredData?.length / 20) + 1; // total number of pages = all markets / marketsPerPage (=20)

  const headers = ['ID', 'Operation', 'Basic', 'Premium', 'Amount']; // table headers
  const rows = curPageOps?.map((fee) => {
    return {
      ID: [fee.identifier, 'plainText'],
      Operation: [fee.type, 'label'],
      Basic: [fee.basic_fee, 'plainText'],
      Premium: [fee.premium_fee, 'plainText'],
      Amount: [fee.price_per_kbyte, 'plainText'],
    };
  });

  useEffect(() => {
    fetchFeesData(); // fetch data
  }, []);

  // handlers
  const onPageChange = (_, newPageNumber) => {
    setPage(newPageNumber);
  };

  const onSearch = (query) => {
    setQuery(query);
  };

  return (
    <styled.PageWrapper>
      <styled.StyledContainer>
        <PageLabel>{t('FEES')}</PageLabel>
        {!isFetchingFeesData && rows ? (
          <Table
            headers={headers}
            rows={rows}
            headerText={'FEE SCHEDULE'}
            withSearch
            lastcellaligned={false}
            onSearch={onSearch}
            searchText={'Search for a fee'}
          ></Table>
        ) : (
          <Loader />
        )}
      </styled.StyledContainer>
      <styled.StyledPaginationContainer>
        <Pagination
          count={totalPages}
          page={page}
          shape="rounded"
          onChange={onPageChange}
        />
      </styled.StyledPaginationContainer>
    </styled.PageWrapper>
  );
};

export default Fees;
