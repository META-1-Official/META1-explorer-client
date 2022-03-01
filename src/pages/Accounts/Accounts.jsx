import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Grid} from '@mui/material';

import {constants} from '../../constants';
import {accountsHelpers} from '../../helpers';

import {AccountActionTypes} from '../../store/accounts/actions';
import {accountsSelector} from '../../store/accounts/selectors';
import {loadingStatusSelector} from '../../store/common/selectors';

import {AppPagination, Table} from '../../components';

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

export default function Accounts() {
  const [pageIndex, setPageIndex] = useState(1);
  const onPageChange = (newPageIndex) => setPageIndex(newPageIndex);

  const [accounts, setAccounts] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: AccountActionTypes.FETCH_ACCOUNTS,
      payload: {
        start: (pageIndex - 1) * constants.API_LIMIT,
        limit: constants.API_LIMIT,
      },
    });
  }, [dispatch, pageIndex]);

  const rawAccounts = useSelector(accountsSelector);
  const isLoading = useSelector(loadingStatusSelector);

  useEffect(() => {
    if (rawAccounts.length) {
      setAccounts(accountsHelpers.mapAccounts(rawAccounts));
    }
  }, [rawAccounts]);

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
