import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Pagination from '@mui/material/Pagination';

import {Table} from '../../components/Table';
import {Loader} from '../../components/Loader';

import {
  accountsSelector,
  accountsFetchingStatusSelector,
} from '../../store/accounts/selector';
import AccountsActionTypes from '../../store/accounts/actions';

import constants from '../../constants';

const TableHeaders = ['Name', 'Amount'];
const AccountsLimit = constants.API_LIMIT;

const accountRawMapper = (account) => {
  const {amount, name} = account;
  return {
    Amount: [Number(amount).toLocaleString(), 'plainText'],
    Name: [name, 'plainText'],
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
    <div className="page">
      <p className="page-title">Accounts</p>
      <div className="page-row">
        <Table headers={TableHeaders} rows={accountRaws} />
        {isFetchingAccounts && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
      <div className="page-row">
        <Pagination
          count={10}
          page={pageNumber}
          shape="rounded"
          onChange={onPageChange}
          sx={{marginLeft: 'auto'}}
        />
      </div>
    </div>
  );
}
