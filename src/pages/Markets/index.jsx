import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';

// import components
import {Table} from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import {SearchBox} from '../../components/SearchBox';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import {localizeNumber} from '../../helpers/utility';

const {fetchActiveMarkets} = actions;
const {getActiveMarkets, isFetchingActiveMarkets} = selectors;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  padding-left: 270px;
  padding-bottom: 38px;
  padding-right: 270px;
  display: flex;
  flex-direction: column;
`;

const StyledPaginationContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  padding-left: 270px;
  padding-bottom: 68px;
  padding-right: 270px;
  display: flex;
  justify-content: flex-end;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Markets = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

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
  const curPageOps = filteredData?.slice((page - 1) * 20, page * 20); // current page markets - 20 markets per page
  const totalPages =
    filteredData?.length === 0 ? 1 : Math.floor(filteredData?.length / 20) + 1; // total number of pages = all markets / marketsPerPage (=20)

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
        <Label>
          Markets
          <SearchBox placeholder="Search for Amount" onSearch={onSearch} />
        </Label>
        {!isFetchingMostActiveMarkets && rows ? (
          <Table headers={headers} rows={rows}></Table>
        ) : (
          <Loader />
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
