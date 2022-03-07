import {lazy} from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Search = lazy(() => import('./pages/Search'));

// blocks
const Blocks = lazy(() => import('./pages/Blocks'));
const Block = lazy(() => import('./pages/Blocks/Block'));

// transactions
const Transactions = lazy(() => import('./pages/Transactions'));
const Transaction = lazy(() => import('./pages/Transactions/Transaction'));

// assets
const Assets = lazy(() => import('./pages/Assets'));
const Accounts = lazy(() => import('./pages/Accounts'));

// markets
const Markets = lazy(() => import('./pages/Markets'));
const Market = lazy(() => import('./pages/Markets/Market'));

// fees
const Fees = lazy(() => import('./pages/Fees'));

// committee
const Committee = lazy(() => import('./pages/Committee'));

// witness
const Witnesses = lazy(() => import('./pages/Witnesses'));

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
    path: '/blocks',
    component: Blocks,
  },
  {
    path: '/blocks/:num',
    component: Block,
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
  {
    path: '/witnesses',
    component: Witnesses
  },
];
