import {APIClient} from './api';
import {constants} from '../constants';
import {httpResponseDecorator} from '../helpers/utility';

const fetchAccounts = (start = 0, limit = constants.API_LIMIT) => {
  return APIClient.get('/accounts', {params: {start, limit}});
};

export const accountsService = {
  fetchAccounts: httpResponseDecorator(fetchAccounts),
};
