import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';

// import components
import {LineChartCard, FilledLineChartCard} from '../../components/Card';
import {Table} from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import {SearchBox} from '../../components/SearchBox';

// import icons
import coinMeta1Img from '../../assets/images/coin-meta1.png';
import coinUsdtImg from '../../assets/images/coin-usdt.png';
import coinBtcImg from '../../assets/images/coin-btc.png';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import api
import {opText} from '../../store/apis/explorer';

const {fetchLastOperations, fetchHeader} = actions;
const {
  getOperations,
  isFetchingLastOperations,
  getHeader,
  isFetchingHeader,
} = selectors;

const mock_chart_data = [
  {uv: 100},
  {uv: 400},
  {uv: 200},
  {uv: 500},
  {uv: 300},
  {uv: 400},
];

// styled components
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledChartContainer = styled.div`
  background: ${(props) => props.theme.palette.background.main};
  padding-top: 118px;
  padding-left: 270px;
  padding-bottom: 38px;
  display: flex;
`;

const LineChartsWrapper = styled.div`
  width: 100%;
  background: ${(props) => props.theme.palette.background.main};
  display: flex;
  max-width: 860px;
  flex-wrap: wrap;
  gap: 17px;
`;

const FilledLineChartWrapper = styled.div`
  margin-left: 17px;
`;

const StyledTableContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  padding-left: 270px;
  padding-bottom: 38px;
  padding-right: 270px;
  display: flex;
  flex-direction: column;
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

const StyledPaginationContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  padding-left: 270px;
  padding-bottom: 68px;
  padding-right: 270px;
  display: flex;
  justify-content: flex-end;
`;

const Assets = React.memo(() => {
  // state vars
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);

  // dispatch
  const dispatch = useDispatch();

  const fetchLastOps = (search_after) =>
    dispatch(fetchLastOperations(search_after));
  const fetchHeaderData = () => dispatch(fetchHeader());

  // selectors
  const getHeadData = useSelector(getHeader);
  const isFetchingHead = useSelector(isFetchingHeader);
  const getOpsData = useSelector(getOperations);
  const isFetchingOps = useSelector(isFetchingLastOperations);

  // vars
  const curPageOps = getOpsData?.slice((page - 1) * 20, page * 20); // current page operations - 20 ops per page
  const totalPages = getOpsData?.length === 0 ? 1 : getOpsData?.length / 20; // total number of pages = all ops / opsPerPage (=20)
  const headers = ['Name', 'Price', '24H Volume', 'Market Cap', 'Supply', 'Holders']; // table headers

  const getRows = () => {
    return null;
  };

  useEffect(() => {
    fetchHeaderData(); // fetch header
    fetchLastOps(undefined); // first fetch with no search_after
  }, []);

  const [v, setV] = useState(false); // the flag var for fethcing for only change
  useEffect(() => {
    if (curPageOps && !v) {
      setV(true);
      // getRows().then((rws) => setRows(rws));
    }
  }, [curPageOps]);

  // handlers
  const onPageChange = (_, newPageNumber) => {
    setPage(newPageNumber);
    setV(false);
    newPageNumber === totalPages &&
      fetchLastOps(getOpsData[getOpsData.length - 1].operation_id_num); // fetch with search_after whenever current page reach out the maximum ES fetch count
  };

  return (
    <PageWrapper>
      <StyledChartContainer>
        <LineChartsWrapper>
          <LineChartCard
            data={mock_chart_data}
            title="24h VOLUME IN META1"
            number={getHeadData?.head_block_number}
            icon={coinMeta1Img}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="24h VOLUME IN USDT"
            number={getHeadData?.accounts_registered_this_interval}
            icon={coinUsdtImg}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="24h VOLUME IN BTC"
            number={getHeadData?.bts_market_cap}
            icon={coinBtcImg}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="24h MARKET CAP IN META1"
            number={getHeadData?.quote_volume}
            icon={coinMeta1Img}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="24h MARKET CAP IN USDT"
            number={getHeadData?.witness_count}
            icon={coinUsdtImg}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="24h MARKET CAP IN BTC"
            number={getHeadData?.committee_count}
            icon={coinBtcImg}
            isLoading={isFetchingHead}
          />
        </LineChartsWrapper>
        <FilledLineChartWrapper>
          <FilledLineChartCard/>
        </FilledLineChartWrapper>
      </StyledChartContainer>
      <StyledTableContainer>
        <Label>Assets
          <SearchBox placeholder='Search for Amount'/>
        </Label>
        <Table headers={headers} rows={[]}></Table>
        {(isFetchingOps || rows.length === 0) && <Loader />}
      </StyledTableContainer>
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
});

export default Assets;
