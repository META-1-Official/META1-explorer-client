import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

// import components
import {SearchCard} from '../../components/Card';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

const {fetchLastBlockNumber, fetchLookupAccounts, fetchLookupAssets} = actions;
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
`;

const StyledContainer = styled.div`
  padding-top: 87px;
  padding-left: 270px;
  padding-bottom: 38px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const Search = React.memo(() => {
  // state vars
  const [block, setBlock] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [account, setAccount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [asset, setAsset] = useState('');
  const [assets, setAssets] = useState([]);

  // dispatch
  const dispatch = useDispatch();

  // actions
  const fetchLastBlockNumberData = () => dispatch(fetchLastBlockNumber());
  const fetchLookupAccountsData = (start) =>
    dispatch(fetchLookupAccounts(start));
  const fetchLookupAssetsData = (start) => dispatch(fetchLookupAssets(start));

  // selectors
  const getLastBlockNumberData = useSelector(getLastBlockNumber);
  const getLookupAccountsData = useSelector(getLookupAccounts);
  const getLookupAssetsData = useSelector(getLookupAssets);
  const isFetchingBlockNumberData = useSelector(isFetchingLastBlockNumber);
  const isFetchingLookupAccountsData = useSelector(isFetchingLookupAccounts);
  const isFetchingLookupAssetsData = useSelector(isFetchingLookupAssets);

  // const vars, funcs
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

  const getAssetsData = () => {
    let asset_data = [];
    for (var i = 0; i < getLookupAssetsData?.length; i++) {
      asset_data[i] = getLookupAssetsData[i][0];
    }
    return asset_data;
  };

  const getAccountsData = () => {
    let account_data = [];
    for (var i = 0; i < getLookupAccountsData?.length; i++) {
      account_data[i] = getLookupAccountsData[i][0];
    }
    return account_data;
  };

  useEffect(() => {
    console.log('blocks', blocks);
  }, [blocks]);

  useEffect(() => {
    console.log('assets', assets);
  }, [assets]);

  useEffect(() => {
    console.log('accounts', accounts);
  }, [accounts]);

  // handlers
  const handleChange = (e, param) => {
    console.log('param', e.target.value);
    if (param === 'block') {
      setBlock(e.target.value);
      fetchLastBlockNumberData();
      setBlocks(getBlockData());
    } else if (param === 'asset') {
      setAsset(e.target.value);
      fetchLookupAssetsData(e.target.value);
      setAssets(getAssetsData());
    } else if (param === 'account') {
      setAccount(e.target.value);
      fetchLookupAccountsData(e.target.value);
      setAccounts(getAccountsData());
    } else if (param === 'tx') {
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
          value={block}
          onChange={(e) => handleChange(e, 'block')}
          isLoading={isFetchingBlockNumberData}
          options={[...new Set(blocks.slice(0, 8))]}
        />
        <SearchCard
          title="Search Account"
          description="Looking for an account? Start typing the first letters of it's name and let the auto complete feature help you find the exact account name string."
          searchInputSample="meta1"
          searchInputLabel="Account name or ID"
          searchInputPlaceholder="Enter account name or id number"
          value={account}
          onChange={(e) => handleChange(e, 'account')}
          isLoading={isFetchingLookupAccountsData}
          options={[...new Set(accounts.slice(0, 8))]}
        />
        <SearchCard
          title="Search Object"
          description="In order to search for an object you need to insert an ID with the correct META1 object format. More info and list can be found HERE."
          searchInputSample="1.3.0"
          searchInputLabel="Object ID"
          searchInputPlaceholder="Enter account name or id number"
        />
        <SearchCard
          title="Search Asset"
          description="Looking for a SmartCoin or UIA? Start typing the first letters of it's name and let the auto complete feature help you find the exact asset name string."
          searchInputSample="USDT"
          searchInputLabel="Asset name or id"
          searchInputPlaceholder="Enter asset name or id"
          value={asset}
          onChange={(e) => handleChange(e, 'asset')}
          isLoading={isFetchingLookupAssetsData}
          options={[...new Set(assets.slice(0, 8))]}
        />
        <SearchCard
          title="Search Transaction Hash"
          description="If you have a transaction hash, please paste it here to get transaction information."
          searchInputSample="cb4a306cb75.....6bb37bbcd29"
          searchInputLabel="Transaction ID"
          searchInputPlaceholder="Enter tx hash"
        />
      </StyledContainer>
    </PageWrapper>
  );
});

export default Search;
