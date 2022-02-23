import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const fetchLastOperations = ({ search_after }) => {
  let req_url = BASE_URL +
    "/es/account_history?size=10000&from_date=now-1d&sort_by=-operation_id_num";

  if (search_after !== undefined) req_url = req_url + '&search_after=' + search_after;

  return axios.get(req_url, {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
}