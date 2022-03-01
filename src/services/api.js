import axios from 'axios';

export const APIClient = axios.create({
  baseURL: 'https://explorer.meta1.io:5000',
});
