import {lazy} from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Search = lazy(() => import('./pages/Search'));

export const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/search',
    component: Search,
  },
];
