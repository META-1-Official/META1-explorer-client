import {lazy} from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Search = lazy(() => import('./pages/Search'));
const Accounts = lazy(() => import('./pages/Accounts'));

export const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: 'search',
    component: Search,
  },
  {
    path: 'accounts',
    component: Accounts,
  },
];
