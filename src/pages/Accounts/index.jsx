import {useState, useEffect} from 'react';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';

import {Table} from '../../components/Table';
import {Loader} from '../../components/Loader';

import {SearchBox} from '../../components/SearchBox';

// import api
import api from '../../store/apis';

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
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
    flex-direction: column;
  }
`;

const Accounts = () => {
  const [page, setPage] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [query, setQuery] = useState('');

  // vars
  const headers = ['Name', 'Amount'];
  const filteredAccounts = accounts?.filter((data) =>
    data.name.includes(query),
  );
  const accountRows = filteredAccounts
    ?.slice((page - 1) * 20, page * 20)
    .map((account) => {
      const {amount, name, id} = account;
      return {
        Amount: [Number(amount).toLocaleString(), 'plainText'],
        Name: [`<a href='/accounts/${id}'>${name}</a>`, 'html'],
      };
    });
  const totalPages =
    filteredAccounts?.length === 0 ? 1 : filteredAccounts?.length / 20;

  useEffect(() => {
    (async () => {
      const accounts = await api.getRichList();
      setAccounts(accounts.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageChange = (_ignore, newPageNumber) => {
    setPage(newPageNumber);
  };

  const onSearch = (query) => {
    setQuery(query);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>
          Accounts
          <SearchBox placeholder="Search for Accounts" onSearch={onSearch} />
        </Label>
        <Table headers={headers} rows={accountRows} />
        {accounts?.length === 0 && <Loader />}
      </StyledContainer>
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
};

export default Accounts;
