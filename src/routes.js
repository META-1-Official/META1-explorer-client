import {lazy} from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Search = lazy(() => import('./pages/Search'));

// transactions
const Transactions = lazy(() => import('./pages/Transactions'));
const Transaction = lazy(() => import('./pages/Transactions/Transaction'));

// assets
const Assets = lazy(() => import('./pages/Assets'));

// markets
const Markets = lazy(() => import('./pages/Markets'));
const Market = lazy(() => import('./pages/Markets/Market'));

// fees
const Fees = lazy(() => import('./pages/Fees'));

// committee
const Committee = lazy(() => import('./pages/Committee'));

export const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/txs',
    component: Transactions,
  },
  {
    path: '/txs/:addr',
    component: Transaction,
  },
  {
    path: '/assets',
    component: Assets,
  },
  {
    path: '/markets',
    component: Markets,
  },
  {
    path: '/markets/:market',
    component: Market,
  },
  {
    path: '/fees',
    component: Fees,
  },
  {
    path: '/committee',
    component: Committee,
  },
];
