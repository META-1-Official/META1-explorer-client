import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {SearchBox} from '../../components/SearchBox';

import * as commonSelectors from '../../store/common/selectors';
import {ActionTypes} from '../../store/transactions/actions';

export default function Dashboard() {
  useSelector(commonSelectors.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: ActionTypes.FETCH_TRANSACTIONS, payload: 'aaa'});
  }, [dispatch]);

  return (
    <div className="page" style={{padding: '2em'}}>
      <SearchBox
        placeholder="Search for Amount"
        onSearch={(ev) => console.log('search: ', ev)}
      />
    </div>
  );
}
