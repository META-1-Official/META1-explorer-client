import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';

import {Table} from '../../../components/Table';
import {Loader} from '../../../components/Loader';
import {Tabs, Tab} from '@mui/material';
import {TabPanel, TabContext} from '@mui/lab';

import {
  accountsSelector,
  accountsFetchingStatusSelector,
} from '../../../store/accounts/selector';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
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
`;

const headers = ['Operation', 'ID', 'Date and Time', 'Block', 'Type'];

const Account = () => {
  const [tabValue, setTabValue] = useState('general');
  const dispatch = useDispatch();
  //   const accounts = useSelector();
  //   const isFetchingAccounts = useSelector();

  useEffect(() => {}, []);

  //   const onPageChange = (_ignore, newPageNumber) => {
  //   };

  // handlers
  const handleChange = (value) => {
    setTabValue(value);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>Accounts</Label>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="general labels"
        >
          <Tab label="General" />
          <Tab label="Balences" />
          <Tab label="Authorities" />
          <Tab label="Votes" />
        </Tabs>
        <Table headers={headers} rows={accountRaws} />
        {isFetchingAccounts && <Loader />}
      </StyledContainer>
      <StyledPaginationContainer>
        <Pagination
            count={10}
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
