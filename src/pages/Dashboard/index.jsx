import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';

// import components
import {LineChartCard} from '../../components/Card';
import {Table} from '../../components/Table';
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
import {opText} from '../../store/apis/explorer';

// import constants
import {OPS_TYPE_LABELS} from '../../constants';

const {fetchLastOperations, fetchHeader} = actions;
const {getOperations, isFetchingLastOperations, getHeader, isFetchingHeader} =
  selectors;

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

const PieChartWrapper = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  width: 100%;
  max-width: 410px;
  border: 1px solid ${(props) => props.theme.palette.border.darkGrey};
  border-radius: 0.625em;
  margin-left: 17px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  color: white;
  &:hover,
  &.on {
    background: ${(props) => props.theme.palette.primary.main};
    color: black;
  }
`;

const OpsTypeLabels = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const OpsTypeLabelWrapper = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }
`;

const OpsTypeLabel = styled.div`
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

const Dashboard = React.memo(() => {
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
  const headers = ['Operation', 'ID', 'Date and time', 'Block', 'Type']; // table headers

  const buildOpTextPromises = (curPageOps) =>
    curPageOps.map((op) =>
      opText(op.operation_type, op.operation_history.op_object),
    );

  const getRows = () => {
    return curPageOps
      ? Promise.all(buildOpTextPromises(curPageOps)).then((opTxts) => {
          return opTxts.map((opTxt, index) => {
            const op = curPageOps[index];
            return {
              Operation: [opTxt, 'html'],
              ID: [op.account_history.operation_id, 'coloredText'],
              'Date and time': [op.block_data.block_time, 'plainText'],
              Block: [op.block_data.block_num, 'coloredText'],
              Type: [op.operation_type, 'label'],
            };
          });
        })
      : Promise.resolve([]);
  };

  useEffect(() => {
    fetchHeaderData(); // fetch header
    fetchLastOps(undefined); // first fetch with no search_after
  }, []);

  const [v, setV] = useState(false); // the flag var for fethcing for only change
  useEffect(() => {
    if (curPageOps && !v) {
      setV(true);
      getRows().then((rws) => setRows(rws));
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
            title="Block Number"
            number={getHeadData?.head_block_number}
            icon={blockNumImg}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="New Users"
            number={getHeadData?.accounts_registered_this_interval}
            icon={newUserImg}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="META1 Market Cap"
            number={getHeadData?.bts_market_cap}
            icon={marketCapImg}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="META1/BTC Volume"
            number={getHeadData?.quote_volume}
            icon={btcVolumeImg}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="Witness"
            number={getHeadData?.witness_count}
            icon={witnessImg}
            isLoading={isFetchingHead}
          />
          <LineChartCard
            data={mock_chart_data}
            title="Committee"
            number={getHeadData?.committee_count}
            icon={committeeImg}
            isLoading={isFetchingHead}
          />
        </LineChartsWrapper>
        <PieChartWrapper>
          <ButtonGroup>
            <StyledButton className="on">Operations</StyledButton>
            <StyledButton>Markets</StyledButton>
            <StyledButton>Holders</StyledButton>
          </ButtonGroup>
          {/* <PieChart></PieChart> */}
          <Label
            style={{
              textAlign: 'center',
              fontWeight: 'normal',
              fontSize: '18px',
            }}
          >
            Asset Price Publish
          </Label>
          <OpsTypeLabels>
            {OPS_TYPE_LABELS.map((label) => (
              <OpsTypeLabelWrapper key={label.type}>
                <Dot color={label.color} />
                <OpsTypeLabel key={label.type}>{label.text}</OpsTypeLabel>
              </OpsTypeLabelWrapper>
            ))}
          </OpsTypeLabels>
        </PieChartWrapper>
      </StyledChartContainer>
      <StyledTableContainer>
        <Label>Recent activity</Label>
        <Table headers={headers} rows={rows}></Table>
        {(isFetchingOps || rows.length === 0) && <Loader />}
      </StyledTableContainer>
      <StyledPaginationContainer>
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
