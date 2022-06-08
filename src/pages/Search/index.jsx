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

const { fetchLastBlockNumber, fetchLookupAccounts, fetchLookupAssets } =
  actions;
const {
  getLastBlockNumber,
  getLookupAccounts,
  getLookupAssets,
  isFetchingLastBlockNumber,
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
  // state vars
  const [block, setBlock] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [account, setAccount] = useState('');
  const [asset, setAsset] = useState('');
  const [assets, setAssets] = useState([]);

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
  const getLastBlockNumberData = useSelector(getLastBlockNumber);
  const getLookupAccountsData = useSelector(getLookupAccounts);
  const getLookupAssetsData = useSelector(getLookupAssets);
  const getLookupTransactionsData = useSelector(getLookupTransactions);
  const isFetchingLookupAccountsData = useSelector(isFetchingLookupAccounts);
  const isFetchingLookupAssetsData = useSelector(isFetchingLookupAssets);

  // vars, funcs
  const getBlockData = () => {
    let number = parseInt(block);
    let block_data = [];
    while (number <= getLastBlockNumberData) {
      block_data.push(number);
      number *= 10;
      number++;
      block_data.push(number);
    }
    return block_data;
  };

  // handlers
  const handleChange = (e, param) => {
    if (param === 'block') {
      setBlock(e.target.value);
    } else if (param === 'asset') {
      setAsset(e.target.value);
      fetchLookupAssetsData(e.target.value);
    } else if (param === 'account') {
      setAccount(e.target.value);
      fetchLookupAccountsData(e.target.value);
    } else if (param === 'transaction') {
      fetchLookupTransactionsData(e.target.value);
    }
  };

  const handleClick = (param) => {
    let ele = document.getElementById(`Search ${_.capitalize(param)}`);
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
      case 'transaction':
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
          description="Looking for an account? Start typing the first letters of it's name and let the auto complete feature help you find the exact account name string."
          searchInputSample="meta1"
          searchInputLabel="Account name or ID"
          searchInputPlaceholder="Enter account name or id number"
          onChange={(e) => handleChange(e, 'account')}
          isLoading={isFetchingLookupAccountsData}
          options={[...new Set(getLookupAccountsData?.slice(0, 8))]}
          onClick={() => handleClick('account')}
        />
        <SearchCard
          title="Search Object"
          description="In order to search for an object you need to insert an ID with the correct META1 object format. More info and list can be found HERE."
          searchInputSample="1.3.0"
          searchInputLabel="Object ID"
          searchInputPlaceholder="Enter object id"
          onClick={() => handleClick('object')}
        />
        <SearchCard
          title="Search Asset"
          description="Looking for a SmartCoin or UIA? Start typing the first letters of it's name and let the auto complete feature help you find the exact asset name string."
          searchInputSample="USDT"
          searchInputLabel="Asset name or id"
          searchInputPlaceholder="Enter asset name or id"
          onChange={(e) => handleChange(e, 'asset')}
          isLoading={isFetchingLookupAssetsData}
          options={[...new Set(getLookupAssetsData?.slice(0, 8))]}
          onClick={() => handleClick('asset')}
        />
        <SearchCard
          title="Search Transaction"
          description="If you have a transaction hash, please paste it here to get transaction information."
          searchInputSample="cb4a306cb75.....6bb37bbcd29"
          searchInputLabel="Transaction ID"
          options={[...new Set(getLookupTransactionsData?.slice(0, 8))]}
          onChange={(e) => handleChange(e, 'transaction')}
          searchInputPlaceholder="Enter transaction hash"
          onClick={() => handleClick('transaction')}
        />
      </StyledContainer>
    </PageWrapper>
  );
});

export default Search;
