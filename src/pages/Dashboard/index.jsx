import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { Tabs, Tab } from '@mui/material';
import CustomPieChart from '../../components/Chart/CustomPieChart';

// import components
import { LineChartCard } from '../../components/Card';
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';

// import icons
import blockNumImg from '../../assets/images/block-num.png';
import newUserImg from '../../assets/images/new-user.png';
import marketCapImg from '../../assets/images/market-cap1.png';
import btcVolumeImg from '../../assets/images/btc-volume.png';
import witnessImg from '../../assets/images/witness.png';
import committeeImg from '../../assets/images/committee.png';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import api
import api from '../../store/apis';

// import constants
import { OPS_TYPE_LABELS, PIE_COLORS } from '../../constants';
import { dashboardRowsBuilder } from '../../helpers/rowBuilders';
import {
  fetchDexVolume,
  fetchSystemAccountBalance,
  setPieData,
} from '../../store/explorer/actions';
import {
  getDexVolume,
  getMeta1Volumes,
  getPieData,
  getSystemAccountsBalance,
} from '../../store/explorer/selectors';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import PaginationSelect from '../../components/AppPagination/PaginationSelect';
import coinUsdtImg from '../../assets/images/coin-usdt.png';
import { is } from 'date-fns/locale';

const { fetchLastOperations, fetchHeader } = actions;
const {
  getActiveAssets,
  getOperations,
  isFetchingLastOperations,
  getHeader,
  isFetchingHeader,
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

  @media only screen and (max-width: 1315px) {
    max-width: 600px;
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const PieChartWrapper = styled.div`
  width: 100%;
  max-width: 410px;
  height: 385px;
  border: 1px solid ${(props) => props.theme.palette.border.darkGrey};
  border-radius: 0.625em;
  margin-left: 17px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 1020px) {
    margin-top: 30px;
  }

  @media ${(props) => props.theme.bkps.device.mobile} {
    max-width: unset;
    width: unset;
    margin-left: 0;
  }
`;

const LegendsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: -15px;
`;

const LegendLabel = styled.div`
  width: ${i18n.language !== 'es' ? '40%' : '48%'};
  display: flex;
  align-items: center;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }
`;

const Legend = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 28px;
  color: ${(props) => props.theme.palette.text.third};
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  background: ${(props) => props.color};
  border-radius: 8px;
  margin-right: 8px;
`;

const StyledTableContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  margin-top: 38px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  margin-bottom: 15px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
  }
`;

const StyledPaginationContainer = styled.div`
  padding-top: 38px;
  display: flex;
  justify-content: flex-end;

  @media ${(props) => props.theme.bkps.device.mobile} {
    justify-content: center;
  }
`;

const Dashboard = React.memo(() => {
  // state vars
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [v, setV] = useState(false); // the flag var for fethcing for only change

  const { t } = useTranslation();

  // dispatch
  const dispatch = useDispatch();

  const fetchLastOps = (search_after) =>
    dispatch(fetchLastOperations(search_after));
  const fetchHeaderData = (options) => dispatch(fetchHeader(options));

  const setPieDataAction = (data) => dispatch(setPieData(data));
  // selectors
  const getHeadData = useSelector(getHeader);
  const getMeta1Volume = (period) =>
    useSelector((state) => getMeta1Volumes(state, period));
  const systemAccountsBalance = useSelector((state) =>
    getSystemAccountsBalance(state),
  );

  const isFetchingHead = useSelector(isFetchingHeader);
  const getOpsData = useSelector(getOperations);
  const isFetchingOps = useSelector(isFetchingLastOperations);
  const pie = useSelector(getPieData);
  const getActiveAssetsData = useSelector(getActiveAssets);
  const getDexVolumeData = useSelector(getDexVolume);

  // vars
  const TabLabels = ['Operations', 'Markets', 'Holders'];
  const curPageOps = getOpsData?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  ); // current page operations - 20 ops per page
  const totalPages =
    getOpsData?.length === 0
      ? 1
      : +(getOpsData?.length / rowsPerPage).toFixed(); // total number of pages = all ops / opsPerPage (=20)
  const headers = ['Operation', 'ID', 'Date and Time', 'Block', 'Type']; // table headers
  const USDTAsset = getActiveAssetsData?.find(
    (data) => data.asset_name === 'USDT',
  );

  const getColor = (name) => {
    if (tabValue === 0) {
      const matchingLabel = OPS_TYPE_LABELS.find(
        (label) => label.text.toUpperCase() === name,
      );
      return matchingLabel?.color || 'white';
    } else {
      const dataIndex = pie[tabValue]?.data.data.findIndex(
        (data) => data.name === name,
      );
      return dataIndex !== -1 ? PIE_COLORS[dataIndex] : 'white';
    }
  };

  useEffect(() => {
    dispatch(fetchSystemAccountBalance());
  }, []);

  useEffect(() => {
    (async () => {
      fetchHeaderData({ isLoading: true }); // fetch header
      fetchLastOps(undefined); // first fetch with no search_after
      dispatch(fetchDexVolume());
      await loadPieData();
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      fetchHeaderData({ isLoading: true }); // fetch header
      dispatch(fetchDexVolume());
      await loadPieData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setInterval(() => fetchHeaderData({ isLoading: false }), 2000 * 60);
  }, []);

  const loadPieData = async () => {
    const [operation, proxies, markets, coins, uias, holders] =
      await Promise.allSettled([
        api.topOperationsChart(),
        api.topProxiesChart(),
        api.topMarketsChart(),
        api.topSmartCoinsChart(),
        api.topUIAsChart(),
        api.topHoldersChart(),
      ]);
    setPieDataAction([
      operation.value,
      markets.value,
      holders.value,
      coins.value,
      uias.value,
      proxies.value,
    ]);
  };

  useEffect(() => {
    if (curPageOps && !v) {
      setV(true);
      dashboardRowsBuilder(curPageOps).then((rws) => setRows(rws));
    }
  }, [curPageOps, rowsPerPage]);

  // handlers
  const onPageChange = (_, newPageNumber) => {
    setPage(newPageNumber);
    setV(false);
    if (newPageNumber === totalPages) {
      const lastOperationId =
        getOpsData[getOpsData.length - 1]?.operation_id_num;
      lastOperationId && fetchLastOps(lastOperationId);
    }
  };

  const onRowsPerPageChange = ({ target }) => {
    const { value } = target;
    setRowsPerPage(value);
    setPage(1);
    setV(false);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const meta1 =
    getActiveAssetsData &&
    getActiveAssetsData.find((asset) => asset.asset_id === '1.3.0');
  const usdt =
    getActiveAssetsData &&
    getActiveAssetsData.find((asset) => asset.asset_id === '1.3.1');
  const meta1MarketCap = meta1?.market_cap - systemAccountsBalance;
  const meta1MarketCapInUSD = Math.round(
    (meta1MarketCap * (usdt?.latest_price || 0)) / 10 ** (usdt?.precision ?? 0),
  );

  const lineChartCardsData = [
    {
      title: 'Block Number',
      number: getHeadData?.head_block_number,
      chartData: getHeadData?.blocks_24h_history,
      icon: blockNumImg,
      isLoading: isFetchingHead,
    },
    {
      title: 'New Users',
      number: getHeadData?.accounts_registered_this_interval,
      chartData: getHeadData?.users_24h_history,
      icon: newUserImg,
      isLoading: isFetchingHead,
    },
    {
      title: 'META1 Market Cap USD',
      number: meta1MarketCapInUSD,
      chartData: getHeadData?.market_cap_24h_history,
      icon: marketCapImg,
      isLoading: isFetchingHead || !meta1MarketCapInUSD,
    },
    {
      title: 'META1/BTC Volume',
      number: getHeadData?.quote_volume,
      chartData: getHeadData?.meta1_to_btc_ratio_24h_history,
      icon: btcVolumeImg,
      isLoading: isFetchingHead,
    },
    {
      title: 'Witnesses',
      number: getHeadData?.witness_count,
      chartData: getHeadData?.witness_24h_history,
      icon: witnessImg,
      isLoading: isFetchingHead,
    },
    {
      title: 'Committee',
      number: getHeadData?.committee_count,
      chartData: getHeadData?.committee_24h_history,
      icon: committeeImg,
      isLoading: isFetchingHead,
    },
    {
      title: 'META1 24H Volume',
      number: +getActiveAssetsData?.[0]?.['24h_volume']?.toFixed(),
      chartData: getMeta1Volume('day').chart,
      icon: btcVolumeImg,
      isLoading: isFetchingHead,
    },
    {
      title: '7D VOLUME IN META1',
      number: getMeta1Volume('week').average,
      chartData: getMeta1Volume('week').chart,
      icon: btcVolumeImg,
      isLoading: isFetchingHead,
    },
    {
      title: '30D VOLUME IN META1',
      number: getMeta1Volume('month').average,
      chartData: getMeta1Volume('month').chart,
      icon: btcVolumeImg,
      isLoading: isFetchingHead,
    },
    {
      title: '24h VOLUME IN USDT',
      number: getDexVolumeData?.volume_usd,
      chartData: getMeta1Volume('day').chart,
      icon: btcVolumeImg,
      isLoading: isFetchingHead,
    },
    {
      title: '7D VOLUME IN USDT',
      number: +(
        getMeta1Volume('week').average / (USDTAsset?.latest_price || 1)
      ).toFixed(),
      chartData: getMeta1Volume('week').chart,
      icon: btcVolumeImg,
      isLoading: isFetchingHead,
    },
    {
      title: '30D VOLUME IN USDT',
      number: +(
        getMeta1Volume('month').average / (USDTAsset?.latest_price || 1)
      ).toFixed(),
      chartData: getMeta1Volume('month').chart,
      icon: btcVolumeImg,
      isLoading: isFetchingHead,
    },
  ];

  return (
    <PageWrapper>
      <StyledChartContainer>
        <LineChartsWrapper>
          {lineChartCardsData.map((data, index) => (
            <LineChartCard
              key={index}
              title={data.title}
              number={data.number}
              chartData={data.chartData}
              icon={data.icon}
              isLoading={data.isLoading}
            />
          ))}
        </LineChartsWrapper>
        <PieChartWrapper>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="operations"
            style={{ marginLeft: '15px' }}
          >
            {TabLabels.map((tlb, index) => (
              <Tab label={t(tlb)} {...a11yProps(index)} key={tlb} />
            ))}
          </Tabs>
          {pie && (
            <div>
              <CustomPieChart
                data={pie[tabValue]?.data.data}
                tabValue={tabValue}
              />
              <LegendsWrapper>
                {tabValue === 0 &&
                  OPS_TYPE_LABELS.map((label) => (
                    <LegendLabel key={label.type}>
                      <Dot color={label.color} />
                      <Legend key={label.type}>{t(label.text)}</Legend>
                    </LegendLabel>
                  ))}
                {tabValue !== 0 &&
                  pie[tabValue]?.data?.data.map((label) => (
                    <LegendLabel key={label.name}>
                      <Dot color={getColor(label.name)} />
                      <Legend key={label.name}>{t(label.name)}</Legend>
                    </LegendLabel>
                  ))}
              </LegendsWrapper>
            </div>
          )}
        </PieChartWrapper>
      </StyledChartContainer>
      <StyledTableContainer>
        <Label>{t('Recent activity')}</Label>
        <Table headers={headers} rows={rows} lastcellaligned={true}></Table>
        {(isFetchingOps || rows.length === 0) && <Loader />}
      </StyledTableContainer>
      <StyledPaginationContainer>
        <PaginationSelect value={rowsPerPage} onChange={onRowsPerPageChange} />
        <Pagination
          count={totalPages ?? 0}
          page={page}
          shape="rounded"
          onChange={onPageChange}
        />
      </StyledPaginationContainer>
    </PageWrapper>
  );
});

export default Dashboard;
