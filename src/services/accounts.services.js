import api from './api';

const fetchAccounts = ({start = 0, limit = 20}) => {
  return api.get('/accounts', {
    params: {start, limit},
  });
};

const accountsService = {fetchAccounts};

export default accountsService;
