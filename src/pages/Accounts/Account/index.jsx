import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Pagination, Typography } from '@mui/material';

import { Table } from '../../../components/Table';
import { Loader } from '../../../components/Loader';
import { Tabs, Tab } from '@mui/material';

// import api
import api from '../../../store/apis';

// import services
import accountsService from '../../../services/accounts.services';

// import utils
import { localizeNumber, operationType } from '../../../helpers/utility';

import General from './general';
import Balances from './balances';
import Authorities from './authorities';
import Votes from './votes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountHistory } from '../../../store/explorer/actions';
import {
  getAccountHistory,
  isFetchingAccountHistory,
} from '../../../store/explorer/selectors';
import { accountHistoryRowsBuilder } from '../../../helpers/rowBuilders';
import { useTranslation } from 'react-i18next';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 38px;
  flex-direction: column;

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding-top: 80px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding: 15px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding: 0;
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

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 15px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
  }
`;

const Account = () => {
  const dispatch = useDispatch();
  const [v, setV] = useState(false);
  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [account, setAccount] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const history = useSelector(getAccountHistory);
  const isAccountHistoryLoading = useSelector(isFetchingAccountHistory);

  const fetchAccountHistoryData = (accountId, search_after) =>
    dispatch(fetchAccountHistory(accountId, search_after));

  // hooks
  const location = useLocation();
  const { t } = useTranslation();

  // var
  const id = location.pathname.split('/')[2];
  const headers = ['Operation', 'ID', 'Date and Time', 'Block', 'Type'];
  const totalPages =
    history?.length === 0 ? 1 : Math.ceil(history?.length / 100);

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  useEffect(() => {
    if (account) {
      (async () => {
        fetchAccountHistoryData(id, undefined);
      })();
    }
  }, [account]);

  const loadData = async () => {
    const account = await api.getFullAccount(id);
    setAccount(account);
  };

  const curPageOps = history?.slice((pageNumber - 1) * 100, pageNumber * 100);

  useEffect(() => {
    if (curPageOps?.length && !v) {
      setV(true);
      accountHistoryRowsBuilder(curPageOps).then((rws) => setRows(rws));
    }
  }, [curPageOps]);

  // handlers
  const onPageChange = (_, newPageNumber) => {
    setPageNumber(newPageNumber);
    setV(false);
    newPageNumber === totalPages &&
      fetchAccountHistoryData(id, history[history.length - 1].operation_id_num); // fetch with search_after whenever current page reach out the maximum ES fetch count
  };

  // handlers
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>{t('ACCOUNTS')}</Label>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="general labels"
          style={{ marginLeft: '15px' }}
        >
          <Tab label={t('General')} {...a11yProps(0)} />
          <Tab label={t('Balances')} {...a11yProps(1)} />
          <Tab label={t('Authorities')} {...a11yProps(2)} />
          <Tab label={t('Votes')} {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          {account && <General accountFullData={account?.data} />}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {account && <Balances accountFullData={account?.data} />}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {account && <Authorities accountFullData={account?.data} />}
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          {account && <Votes accountFullData={account?.data} />}
        </TabPanel>
      </StyledContainer>
      <StyledHsContainer>
        <Label>{t('Full Account History')}</Label>
        {history && <Table headers={headers} rows={rows} lastcellaligned />}
        {isAccountHistoryLoading && <Loader />}
        {history?.length === 0 && !isAccountHistoryLoading && (
          <Typography align={'center'} color={'#FFFFFF'} marginTop={'1rem'}>
            {t('NO OPERATIONS FOUND')}
          </Typography>
        )}
      </StyledHsContainer>
      <StyledPaginationContainer>
        <Pagination
          count={totalPages}
          page={pageNumber}
          shape="rounded"
          onChange={onPageChange}
        />
      </StyledPaginationContainer>
    </PageWrapper>
  );
};

export default Account;
