import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';

// import components
import { LineChartCard, FilledLineChartCard } from '../../components/Card';
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import { SearchBox } from '../../components/SearchBox';

// import icons
import coinMeta1Img from '../../assets/images/coin-meta1.png';
import coinUsdtImg from '../../assets/images/coin-usdt.png';
import coinBtcImg from '../../assets/images/coin-btc.png';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import { localizeNumber } from '../../helpers/utility';
import images from '../../helpers/images';
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';

const { fetchActiveAssets, fetchDexVolume, fetchDailyDexChart } = actions;
const {
  getActiveAssets,
  getDexVolume,
  getDailyDexChart,
  isFetchingActiveAssets,
  isFetchingDexVolume,
  isFetchingDailyDexChart,
} = selectors;

// styled components
const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;
  flex-direction: column;
`;

const StyledChartContainer = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
    align-items: center;
  }

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const LineChartsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  justify-content: center;

  @media only screen and (max-width: 1315px) {
    max-width: 600px;
  }
`;

const FilledLineChartWrapper = styled.div`
  margin-left: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 408px;

  @media only screen and (max-width: 1020px) {
    margin-top: 30px;
  }

  @media ${(props) => props.theme.bkps.device.mobile} {
    max-width: unset;
    margin-left: 0;
  }
`;

const StyledTableContainer = styled.div`
  padding-top: 38px;
  display: flex;
  flex-direction: column;
`;

const StyledPaginationContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  display: flex;
  justify-content: flex-end;

  @media ${(props) => props.theme.bkps.device.mobile} {
    justify-content: center;
  }
`;

const Assets = React.memo(() => {
  // state vars
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const { t } = useTranslation();

  // dispatch
  const dispatch = useDispatch();

  const fetchActiveAssetsData = () => dispatch(fetchActiveAssets());
  const fetchDexVolumeData = () => dispatch(fetchDexVolume());
  const fetchDailyDexChartData = () => dispatch(fetchDailyDexChart());

  // selectors
  const getActiveAssetsData = useSelector(getActiveAssets);
  const getDexVolumeData = useSelector(getDexVolume);
  const getDailyDexChartData = useSelector(getDailyDexChart);
  const isFetchingAssets = useSelector(isFetchingActiveAssets);
  const isFetchingVolume = useSelector(isFetchingDexVolume);
  const isFetchingChart = useSelector(isFetchingDailyDexChart);

  // vars
  const filteredData = getActiveAssetsData?.filter((data) =>
    data.asset_name.includes(query.toUpperCase()),
  );
  const curPageOps = filteredData?.slice((page - 1) * 20, page * 20); // current page assets - 20 assets per page
  const totalPages =
    filteredData?.length === 0 ? 1 : Math.floor(filteredData?.length / 20) + 1; // total number of pages = all assets / assetsPerPage (=20)

  const headers = [
    'Name',
    'Price',
    '24H Volume',
    'Market Cap',
    'Supply',
    'Holders',
  ]; // table headers
  const chartData =
    getDailyDexChartData &&
    Object.keys(getDailyDexChartData).map((key) => {
      return {
        date: key,
        volume: getDailyDexChartData[key],
      };
    });

  const rows = curPageOps
    ? curPageOps.map((value) => {
        var precision = 100000;
        if (value.precision) {
          precision = Math.pow(10, value.precision);
        }
        return {
          Name: [
            `<img src='${
              images[`coin-${value.asset_name.toLowerCase()}`]
            }'><a href='/assets/${value.asset_id}'>${value.asset_name}</a>`,
            'html',
          ],
          Price: [`${value.latest_price} META1`, 'plainText'],
          '24H Volume': [
            `${Math.round(value['24h_volume'])} META1`,
            'plainText',
          ],
          'Market Cap': [
            `${localizeNumber(Math.round(value.market_cap / 100000))} META1`,
            'plainText',
          ],
          Supply: [
            localizeNumber(Math.round(value.current_supply / precision)),
            'plainText',
          ],
          Holders: [localizeNumber(value.holders_count), 'plainText'],
        };
      })
    : [];

  useEffect(() => {
    fetchDexVolumeData();
    fetchDailyDexChartData();
    fetchActiveAssetsData();
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
      <StyledChartContainer>
        <LineChartsWrapper>
          <LineChartCard
            title="24h VOLUME IN META1"
            number={getDexVolumeData?.volume_bts}
            icon={coinMeta1Img}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title="24h VOLUME IN USDT"
            number={getDexVolumeData?.volume_usd}
            icon={coinUsdtImg}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title="24h VOLUME IN BTC"
            number={getDexVolumeData?.volume_cny}
            icon={coinBtcImg}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title="24h MARKET CAP IN META1"
            number={getDexVolumeData?.market_cap_bts.toString().slice(0, -12)}
            icon={coinMeta1Img}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title="24h MARKET CAP IN USDT"
            number={getDexVolumeData?.market_cap_usd.toString().slice(0, -12)}
            icon={coinUsdtImg}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title="24h MARKET CAP IN BTC"
            number={getDexVolumeData?.market_cap_cny.toString().slice(0, -12)}
            icon={coinBtcImg}
            isLoading={isFetchingVolume}
          />
        </LineChartsWrapper>
        <FilledLineChartWrapper>
          {isFetchingChart ? (
            <Loader />
          ) : (
            <FilledLineChartCard data={chartData} />
          )}
        </FilledLineChartWrapper>
      </StyledChartContainer>
      <StyledTableContainer>
        <PageLabel>
          {t('Assets')}
          <SearchBox placeholder="Search for Assets" onSearch={onSearch} />
        </PageLabel>
        <Table headers={headers} rows={rows}></Table>
        {isFetchingAssets && <Loader />}
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
