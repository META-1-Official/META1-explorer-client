import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import { SearchBox } from '../../components/SearchBox';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import { localizeNumber } from '../../helpers/utility';
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';
import { EmptyLabel } from '../../components/EmptyResultsBlock/EmptyResultsBlock.styles';
import EmptyResultsBlock from '../../components/EmptyResultsBlock';

const { fetchActiveMarkets } = actions;
const { getActiveMarkets, isFetchingActiveMarkets } = selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPaginationContainer = styled.div`
  padding-top: 38px;
  display: flex;
  justify-content: flex-end;

  @media ${(props) => props.theme.bkps.device.mobile} {
    justify-content: center;
  }
`;

const Markets = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const { t } = useTranslation();

  // dispatch
  const dispatch = useDispatch();

  const fetchMostActiveMarkets = () => dispatch(fetchActiveMarkets());

  // selectors
  const getMostActiveMarkets = useSelector(getActiveMarkets);
  const isFetchingMostActiveMarkets = useSelector(isFetchingActiveMarkets);

  // vars
  const filteredData = getMostActiveMarkets?.filter((data) =>
    data.pair.includes(query.toUpperCase()),
  );
  const curPageOps =
    filteredData?.length > 25
      ? filteredData?.slice((page - 1) * 25, page * 25)
      : filteredData; // current page markets - 25 markets per page
  const totalPages =
    filteredData?.length === 0 ? 1 : Math.floor(filteredData?.length / 25) + 1; // total number of pages = all markets / marketsPerPage (=25)

  const headers = ['Pair', 'Price', 'Operations']; // table headers
  const rows = curPageOps?.map((market) => {
    return {
      Pair: [`<a href="/markets/${market.pair}">${market.pair}</a>`, 'html'],
      Price: [market.latest_price, 'plainText'],
      Operations: [localizeNumber(market['24h_volume']), 'plainText'],
    };
  });

  useEffect(() => {
    fetchMostActiveMarkets(); // fetch data
  }, []);

  // handlers
  const onPageChange = (_, newPageNumber) => {
    setPage(newPageNumber);
  };

  const onSearch = (query) => {
    setQuery(query);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <PageLabel>{t('MARKETS')}</PageLabel>
        {isFetchingMostActiveMarkets && <Loader />}
        {!isFetchingMostActiveMarkets && rows && (
          <Table
            headers={headers}
            rows={rows}
            searchText={'Search for a markets'}
            onSearch={onSearch}
            withSearch
            headerText={'MOST ACTIVE MARKETS'}
          ></Table>
        )}
        {getMostActiveMarkets?.length && !rows?.length && (
          <EmptyResultsBlock withoutLink />
        )}
      </StyledContainer>
      <StyledPaginationContainer>
        <Pagination
          count={totalPages}
          page={page}
          shape="rounded"
          onChange={onPageChange}
        />
      </StyledPaginationContainer>
    </PageWrapper>
  );
};

export default Markets;
