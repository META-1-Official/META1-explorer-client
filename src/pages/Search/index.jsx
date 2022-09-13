import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

// import components
import { SearchCard } from '../../components/Card';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';
import { toast } from 'react-toastify';
import {
  fetchLookupBlocks,
  fetchLookupTransactions,
} from '../../store/explorer/actions';
import {
  getLookupBlocks,
  getLookupTransactions,
} from '../../store/explorer/selectors';

const { fetchLookupAccounts, fetchLookupAssets } = actions;
const {
  getLookupAccounts,
  getLookupAssets,
  isFetchingLookupAccounts,
  isFetchingLookupAssets,
} = selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: flex-start;

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding: 0 16px;
  }
`;

const Search = React.memo(() => {
  // hooks
  let navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  // actions
  const fetchLookupAccountsData = (start) =>
    dispatch(fetchLookupAccounts(start));
  const fetchLookupAssetsData = (start) => dispatch(fetchLookupAssets(start));
  const fetchLookupTransactionsData = (start) =>
    dispatch(fetchLookupTransactions(start));

  // selectors
  const getLookupAccountsData = useSelector(getLookupAccounts);
  const getLookupAssetsData = useSelector(getLookupAssets);
  const getLookupTransactionsData = useSelector(getLookupTransactions);
  const isFetchingLookupAccountsData = useSelector(isFetchingLookupAccounts);
  const isFetchingLookupAssetsData = useSelector(isFetchingLookupAssets);
  // handlers
  const handleChange = (e, param) => {
    if (e && param === 'asset' && e?.type !== 'click') {
      fetchLookupAssetsData(e.target.value);
    } else if (e && param === 'account') {
      fetchLookupAccountsData(e.target.value);
    } else if (e && param === 'transaction') {
      fetchLookupTransactionsData(e.target.value);
    }
  };

  const handleClick = (param) => {
    let ele = !param.includes('Transaction')
      ? document.getElementById(`Search ${_.capitalize(param)}`)
      : document.getElementById(`Search Transaction Hash`);
    if (ele.value === '') {
      toast('search value is empty');
      return;
    }
    switch (param) {
      case 'block':
        navigate(`/blocks/${ele.value}`);
        break;
      case 'asset':
        navigate(`/assets/${ele.value}`);
        break;
      case 'account':
        navigate(`/accounts/${ele.value}`);
        break;
      case 'Transaction Hash':
        navigate(`/txs/${ele.value}`);
        break;
      case 'object':
        navigate(`/objects/${ele.value}`);
        break;
      default:
    }
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <SearchCard
          title="Search Block"
          description="Search by block by inserting block number. No commas, no dots, just pure numbers."
          searchInputSample="194"
          searchInputLabel="Block number"
          searchInputPlaceholder="Enter Block number"
          onChange={(e) => handleChange(e, 'block')}
          onClick={() => handleClick('block')}
        />
        <SearchCard
          title="Search Account"
          withSelect
          description="Looking for an account? Start typing the first letters of it's name and let the auto complete feature help you find the exact account name string."
          searchInputSample="meta1"
          searchInputLabel="Account name or ID"
          searchInputPlaceholder="Enter account name or id number"
          onChange={(e) => handleChange(e, 'account')}
          isLoading={isFetchingLookupAccountsData}
          options={[...new Set(getLookupAccountsData)]}
          onClick={() => handleClick('account')}
        />
        {/*<SearchCard*/}
        {/*  title="Search Object"*/}
        {/*  description="In order to search for an object you need to insert an ID with the correct META1 object format. More info and list can be found HERE."*/}
        {/*  searchInputSample="1.3.0"*/}
        {/*  searchInputLabel="Object ID"*/}
        {/*  searchInputPlaceholder="Enter object id"*/}
        {/*  onChange={(e) => handleChange(e, 'object')}*/}
        {/*  onClick={() => handleClick('object')}*/}
        {/*/>*/}
        <SearchCard
          withSelect
          title="Search Asset"
          description="Looking for a SmartCoin or UIA? Start typing the first letters of it's name and let the auto complete feature help you find the exact asset name string."
          searchInputSample="USDT"
          searchInputLabel="Asset name or ID"
          searchInputPlaceholder="Enter asset name or id"
          onChange={(e) => handleChange(e, 'asset')}
          isLoading={isFetchingLookupAssetsData}
          options={[...new Set(getLookupAssetsData?.slice(0, 8))]}
          onClick={() => handleClick('asset')}
        />
        <SearchCard
          withSelect
          title="Search Transaction Hash"
          description="If you have a transaction hash, please paste it here to get transaction information."
          searchInputSample="cb4a306cb75.....6bb37bbcd29"
          searchInputLabel="Transaction ID"
          options={[...new Set(getLookupTransactionsData)]}
          onChange={(e) => handleChange(e, 'transaction')}
          searchInputPlaceholder="Enter transaction hash"
          onClick={() => handleClick('Transaction Hash')}
        />
      </StyledContainer>
    </PageWrapper>
  );
});

export default Search;
