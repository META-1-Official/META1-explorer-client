import Cache from './Cache';
import axios from 'axios';

const useAccount = async (accountId) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const URL = BASE_URL + '/explorer/account_name?account_id=' + `${accountId}`;

  const name = Cache.get('accounts', accountId);
  if (!name) {
    const response = await axios.get(URL);
    Cache.put('accounts', accountId, response.data);
    return Promise.resolve(response.data);
  } else {
    return Promise.resolve(name);
  }
};

export default useAccount;
