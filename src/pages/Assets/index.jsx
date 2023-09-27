import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';
import { assetRowsBuilder } from '../../helpers/rowBuilders';
import { getMeta1Volumes } from '../../store/explorer/selectors';
import btcVolumeImg from '../../assets/images/btc-volume.png';
import { fetchHeader } from '../../store/explorer/actions';
import {
  FilledLineChartWrapper,
  LineChartsWrapper,
  PageWrapper,
  StyledChartContainer,
  StyledPaginationContainer,
  StyledTableContainer,
} from './Assets.styles';

const { fetchActiveAssets, fetchDexVolume, fetchDailyDexChart } = actions;
const {
  getActiveAssets,
  getDexVolume,
  getDailyDexChart,
  isFetchingActiveAssets,
  isFetchingDexVolume,
  isFetchingDailyDexChart,
} = selectors;

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
  const getMeta1Volume = (period) =>
    useSelector((state) => getMeta1Volumes(state, period));
  const USDTAsset = getActiveAssetsData?.find(
    (data) => data.asset_name === 'USDT',
  );

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

  const rows = assetRowsBuilder(curPageOps);

  useEffect(() => {
    fetchDexVolumeData();
    fetchDailyDexChartData();
    fetchActiveAssetsData();
    dispatch(fetchHeader({ isFromAssets: true }));
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
            number={getDexVolumeData?.market_cap_bts?.toString().slice(0, -12)}
            icon={coinMeta1Img}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title="24h MARKET CAP IN USDT"
            number={getDexVolumeData?.market_cap_usd?.toString().slice(0, -12)}
            icon={coinUsdtImg}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title="24h MARKET CAP IN BTC"
            number={getDexVolumeData?.market_cap_cny?.toString().slice(0, -12)}
            icon={coinBtcImg}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title={'7D VOLUME IN META1'}
            number={getMeta1Volume('week').total}
            icon={coinMeta1Img}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title={'30D VOLUME IN META1'}
            number={getMeta1Volume('month').total}
            icon={coinMeta1Img}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title={'7D VOLUME IN USDT'}
            number={
              +(
                getMeta1Volume('week').total / USDTAsset?.latest_price
              ).toFixed()
            }
            icon={coinUsdtImg}
            isLoading={isFetchingVolume}
          />
          <LineChartCard
            title={'30D VOLUME IN USDT'}
            number={
              +(
                getMeta1Volume('month').total / USDTAsset?.latest_price
              ).toFixed()
            }
            icon={coinUsdtImg}
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
