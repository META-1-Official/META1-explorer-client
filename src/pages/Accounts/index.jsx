import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';

import {Table} from '../../components/Table';
import {Loader} from '../../components/Loader';

import {
  accountsSelector,
  accountsFetchingStatusSelector,
} from '../../store/accounts/selector';
import AccountsActionTypes from '../../store/accounts/actions';

import constants from '../../constants';

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

const headers = ['Name', 'Amount'];
const AccountsLimit = constants.API_LIMIT;

const accountRawMapper = (account) => {
  const {amount, name, account_id} = account;
  return {
    Amount: [Number(amount).toLocaleString(), 'plainText'],
    Name: [`<a href='/accounts/${account_id}'>${name}</a>`, 'html'],
  };
};

export default function Accounts() {
  const [pageNumber, setPageNumber] = useState(1);
  const [accountRaws, setAccountRaws] = useState([]);

  const dispatch = useDispatch();
  const accounts = useSelector(accountsSelector);
  const isFetchingAccounts = useSelector(accountsFetchingStatusSelector);

  useEffect(() => {
    dispatch({
      type: AccountsActionTypes.FETCH_ACCOUNTS,
      payload: {start: (pageNumber - 1) * AccountsLimit, limit: AccountsLimit},
    });
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (accounts.length) {
      const temp = accounts.map(accountRawMapper);
      setAccountRaws(temp);
    }
  }, [accounts]);

  const onPageChange = (_ignore, newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>Accounts</Label>
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
}
