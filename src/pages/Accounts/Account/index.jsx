import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

import {Pagination} from '@mui/material';

import {Table} from '../../../components/Table';
import {Loader} from '../../../components/Loader';
import {Tabs, Tab} from '@mui/material';

// import api
import api from '../../../store/apis';

// import services
import accountsService from '../../../services/accounts.services';

// import utils
import {localizeNumber} from '../../../helpers/utility';

import General from './general';
import Balances from './balances';
import Authorities from './authorities';
import Votes from './votes';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 38px;
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
`;

const Account = () => {
  const [tabValue, setTabValue] = useState(0);
  const [account, setAccount] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [history, setHistory] = useState(null);

  // hooks
  const location = useLocation();

  // var
  const id = location.pathname.split('/')[2];
  const headers = ['Operation', 'ID', 'Date and Time', 'Block', 'Type'];
  const history_rows = history
    ? history.map((vote) => {
        return {
          Id: [`<a href="/objects/${vote.id}">${vote.id}</a>`, 'html'],
          Type: [vote.type, 'plainText'],
          Account: [
            `<a href="/accounts/${vote.account}">${vote.account_name}</a>`,
            'html',
          ],
          'Total Votes': [localizeNumber(vote.votes_for), 'plainText'],
        };
      })
    : [];

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account) {
      (async () => {
        const parsed = await accountsService.getAccountHistoryData(
          account?.data,
        );
        setHistory(parsed);
      })();
    }
  }, [account]);

  const loadData = async () => {
    const account = await api.getFullAccount(id);
    setAccount(account);
  };

  const onPageChange = (_ignore, newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  // handlers
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

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
        <Label>Accounts</Label>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="general labels"
          style={{marginLeft: '15px'}}
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Balences" {...a11yProps(1)} />
          <Tab label="Authorities" {...a11yProps(2)} />
          <Tab label="Votes" {...a11yProps(3)} />
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
      <StyledContainer style={{marginTop: '50px', padding: '15px'}}>
        <Label>Full Account History</Label>
        <Table headers={headers} rows={history_rows} />
        {history_rows && <Loader />}
      </StyledContainer>
      <StyledPaginationContainer>
        <Pagination
          count={account?.data.total_ops}
          page={pageNumber}
          shape="rounded"
          onChange={onPageChange}
          sx={{marginLeft: 'auto'}}
        />
      </StyledPaginationContainer>
    </PageWrapper>
  );
};

export default Account;
