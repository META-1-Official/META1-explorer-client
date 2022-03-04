import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Table} from '../../components/Table';

import AccountsActionTypes from '../../store/accounts/actions';
import {accountsSelector} from '../../store/accounts/selector';

const TableHeaders = ['Name', 'Amount'];

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

  useEffect(() => {
    dispatch({
      type: AccountsActionTypes.FETCH_ACCOUNTS,
      payload: {start: 0, limit: 20},
    });
  }, [dispatch]);

  useEffect(() => {
    if (accounts.length) {
      const temp = accounts.map(accountRawMapper);
      setAccountRaws(temp);
    }
  }, [accounts]);

  return (
    <div className="page">
      <span>Accounts</span>
      <Table headers={TableHeaders} rows={accountRaws} />
    </div>
  );
}
