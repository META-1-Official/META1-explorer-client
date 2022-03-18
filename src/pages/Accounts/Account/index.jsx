import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

import {Pagination} from '@mui/material';

import {Table} from '../../../components/Table';
import {Loader} from '../../../components/Loader';
import {Tabs, Tab} from '@mui/material';
import {TabPanel, TabContext} from '@mui/lab';

import api from '../../../store/apis';

import General from './general';
import Balances from './balances';

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

const headers = ['Operation', 'ID', 'Date and Time', 'Block', 'Type'];

const Account = () => {
  const [tabValue, setTabValue] = useState(0);
  const [account, setAccount] = useState();

  // hooks
  const dispatch = useDispatch();
  const location = useLocation();

  // var
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    const account = await api.getFullAccount(id);
    setAccount(account);
  };

  //   const onPageChange = (_ignore, newPageNumber) => {
  //   };

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
          Item Three
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          Item Three
        </TabPanel>
        {/* <Table headers={headers} rows={accountRaws} /> */}
        {/* {isFetchingAccounts && <Loader />} */}
      </StyledContainer>
      <StyledPaginationContainer>
        {/* <Pagination
            count={10}
            page={pageNumber}
            shape="rounded"
            onChange={onPageChange}
            sx={{marginLeft: 'auto'}}
        /> */}
      </StyledPaginationContainer>
    </PageWrapper>
  );
};

export default Account;
