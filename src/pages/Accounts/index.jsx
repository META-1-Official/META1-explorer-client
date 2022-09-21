import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';

import { Table } from '../../components/Table';
import { Loader } from '../../components/Loader';

// import api
import api from '../../store/apis';
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';
import { Link } from '@mui/material';
import EmptyResultsBlock from '../../components/EmptyResultsBlock';

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

const Accounts = () => {
  const [page, setPage] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [query, setQuery] = useState('');

  const { t } = useTranslation();

  // vars
  const headers = ['Name', 'Amount'];
  const filteredAccounts = accounts?.filter((data) => {
    return /^\d/.test(query)
      ? data.amount.toString().includes(query)
      : data.name.includes(query);
  });
  const totalPages =
    filteredAccounts?.length === 0
      ? 1
      : Math.ceil(filteredAccounts?.length / 20);

  const currentAccounts =
    filteredAccounts?.length > 20
      ? filteredAccounts?.slice((page - 1) * 20, page * 20)
      : filteredAccounts;

  const accountRows = currentAccounts.map((account) => {
    const { amount, name, id } = account;
    return {
      Amount: [`${Number(amount).toLocaleString()} META1`, 'plainText'],
      Name: [`<a href='/accounts/${id}'>${name}</a>`, 'html'],
    };
  });

  useEffect(() => {
    (async () => {
      const accounts = await api.getRichList();
      setAccounts(accounts.data);
    })();
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
        <PageLabel>{t('WALLETS')}</PageLabel>
        <Table
          headers={headers}
          rows={accountRows}
          withSearch
          onSearch={onSearch}
          headerText={'RICH LIST'}
          searchText={'Search for Account'}
        />
        {accounts?.length === 0 && <Loader />}
        {accounts.length && !currentAccounts?.length && <EmptyResultsBlock />}
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
