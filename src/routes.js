import {lazy} from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Search = lazy(() => import('./pages/Search'));

// transactions
const Transactions = lazy(() => import('./pages/Transactions'));
const Transaction = lazy(() => import('./pages/Transactions/Transaction'));

// assets
const Assets = lazy(() => import('./pages/Assets'));
const Accounts = lazy(() => import('./pages/Accounts'));

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
    path: '/accounts',
    component: Accounts,
  },
];
