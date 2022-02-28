import {useState} from 'react';

import {Grid} from '@mui/material';

import {AppPagination, Table} from '../../components';

import {constants} from '../../constants';

const AccountsTableColumns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'amount',
    label: 'Amount',
  },
];

const Rows = [
  {
    name: 'META1',
    amount: 123123,
  },
  {
    name: 'META1',
    amount: 123123,
  },
  {
    name: 'META1',
    amount: 123123,
  },
  {
    name: 'META1',
    amount: 123123,
  },
  {
    name: 'META1',
    amount: 123123,
  },
  {
    name: 'META1',
    amount: 123123,
  },
  {
    name: 'META1',
    amount: 123123,
  },
  {
    name: 'META1',
    amount: 123123,
  },
];

export default function Accounts() {
  const [pageIndex, setPageIndex] = useState(1);
  const [accounts, setAccounts] = useState(Rows);

  const onPageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  return (
    <div className="page">
      <Grid container spacing={0}>
        <Grid item xs={12} sx={{marginTop: '1em'}}>
          <p className="text text-lg text-white mt-0">Accounts</p>
        </Grid>
        <Grid item xs={12} sx={{marginTop: '1em'}}>
          <Table columns={AccountsTableColumns} rows={accounts} />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '1em'}}
        >
          <AppPagination page={pageIndex} onChange={onPageChange} />
        </Grid>
      </Grid>
    </div>
  );
}
