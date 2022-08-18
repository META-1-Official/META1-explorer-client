import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { debounce } from 'lodash';

import { Pagination, Typography, Tabs, Tab } from '@mui/material';

import { Table } from '../../../components/Table';
import { Loader } from '../../../components/Loader';
import TabPanel from '../../../components/TabPanel';

// import api
import api from '../../../store/apis';

// import utils
import { opMapping } from '../../../helpers/utility';

import General from './general';
import Balances from './balances';
import Authorities from './authorities';
import Votes from './votes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountHistory } from '../../../store/explorer/actions';
import {
  getAccountHistory,
  getAccountHistoryCount,
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

const EmptyBlock = styled.div`
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const Account = () => {
  const dispatch = useDispatch();
  const [v, setV] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [account, setAccount] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedSearchValues, setSelectedSearchValues] = useState([]);
  const [loadingAccount, setLoadingAccount] = useState(true);

  const fetchAccountHistoryData = (accountId, from, search_after, object_ids) =>
    dispatch(fetchAccountHistory(accountId, from, search_after, object_ids));

  // hooks
  const location = useLocation();
  const { t } = useTranslation();

  const history = useSelector(getAccountHistory);
  const historyCount = useSelector(getAccountHistoryCount);
  const isAccountHistoryLoading = useSelector(isFetchingAccountHistory);

  // var
  const id = location.pathname.split('/')[2];
  const headers = ['Operation', 'ID', 'Date and Time', 'Block', 'Type'];
  const OPERATIONS_PER_PAGE = 100;

  useEffect(() => {
    (async () => {
      api
        .getFullAccount(id)
        .then((account) => {
          setAccount(account);
        })
        .finally(() => setLoadingAccount(false));
    })();
  }, []);

  useEffect(() => {
    if (account) {
      (async () => {
        fetchAccountHistoryData(id, undefined);
      })();
    }
  }, [account]);

  useEffect(() => {
    if (
      pageNumber >= totalPages &&
      pageNumber * OPERATIONS_PER_PAGE < historyCount
    ) {
      setTotalPages(totalPages + 1);
    }

    if (history?.length && !v) {
      setV(true);
      accountHistoryRowsBuilder(history).then((rws) => setRows(rws));
    }
  }, [history]);

  const operationIdsBuilder = (entryArray) => {
    return Object.entries(opMapping)
      .filter(([, value]) => entryArray.includes(value))
      .map((item) => item[0])
      .join('.');
  };

  // handlers
  const onPageChange = (_, newPageNumber) => {
    setPageNumber(newPageNumber);
    setV(false);
    if (
      (newPageNumber === totalPages && newPageNumber < OPERATIONS_PER_PAGE) ||
      newPageNumber !== totalPages
    ) {
      setRows([]);
      const ids = operationIdsBuilder(selectedSearchValues);
      fetchAccountHistoryData(
        id,
        (newPageNumber - 1) * OPERATIONS_PER_PAGE,
        undefined,
        ids,
      );
    } else if (
      newPageNumber === totalPages &&
      newPageNumber > OPERATIONS_PER_PAGE
    ) {
      setRows([]);
      fetchAccountHistoryData(
        id,
        0,
        history[history.length - 1].operation_id_num,
        selectedSearchValues,
      ); // fetch with search_after whenever current page reach out the maximum ES fetch count
    }
  };

  // handlers
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const fetchSelectedData = (tags) => {
    setRows([]);
    const ids = tags?.length
      ? operationIdsBuilder(tags)
      : operationIdsBuilder(selectedSearchValues);
    setTotalPages(1);
    fetchAccountHistoryData(id, 0, undefined, ids);
    setPageNumber(1);
    setV(false);
  };

  const onSearch = (event) => {
    const selectedTags =
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;
    setSelectedSearchValues(selectedTags);
  };

  const clearFilters = () => {
    setSelectedSearchValues([]);
    setRows([]);
    fetchAccountHistoryData(id, 0, undefined);
    setV(false);
  };
  if (account && !loadingAccount) {
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
          {history && (
            <Table
              headers={headers}
              withSelect
              selectMultiple
              selectSelectedValues={selectedSearchValues}
              selectValues={Object.values(opMapping)}
              selectPlaceholder={'Select operation category'}
              searchCallback={fetchSelectedData}
              clearFilters={clearFilters}
              onSearch={onSearch}
              rows={rows}
              lastcellaligned
            />
          )}
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
  } else if (!account && !loadingAccount) {
    return (
      <PageWrapper>
        <StyledContainer>
          <EmptyBlock>NO ACCOUNT FOUND</EmptyBlock>
        </StyledContainer>
      </PageWrapper>
    );
  } else {
    return null;
  }
};

export default Account;
