import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

// import components
import {Table} from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';
import {SearchBox} from '../../../components/SearchBox';

// import services
import accountsService from '../../../services/accounts.services';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BlockWrapper = styled.div`
  margin-top: 38px;
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;
`;

const Balances = ({accountFullData}) => {
  const [assetQuery, setAssetQuery] = useState('');
  const [vestingQuery, setVestingQuery] = useState('');
  const [parsedAssetBalances, setParsedAssetBalances] = useState([]);
  const [parsedVestingBalances, setParsedVestingBalances] = useState([]);

  useEffect(() => {
    if (accountFullData) {
      (async () => {
        const parsed = await accountsService.getBalanceData(accountFullData);
        setParsedAssetBalances(parsed?.asset);
        setParsedVestingBalances(parsed?.vesting);
      })();
    }
  }, []);

  // vars
  const filteredAssetData = parsedAssetBalances?.filter((balance) =>
    balance.asset_name.includes(assetQuery.toUpperCase()),
  );

  const filteredVestingData = parsedVestingBalances?.filter((balance) =>
    balance.asset_name.includes(vestingQuery.toUpperCase()),
  );

  const headers = ['Id', 'Asset', 'Balance']; // table headers
  const asset_rows = filteredAssetData?.map((balance) => {
    return {
      Id: [`<a href="/objects/${balance.id}">${balance.id}</a>`, 'html'],
      Asset: [`<a href="/assets/${balance.asset}">${balance.asset_name}</a>`, 'html'],
      Balance: [balance.balance, 'plainText'],
    };
  });

  const vesting_rows = filteredVestingData?.map((balance) => {
    return {
      Id: [`<a href="/objects/${balance.id}">${balance.id}</a>`, 'html'],
      Asset: [`<a href="/assets/${balance.asset}">${balance.asset_name}</a>`, 'html'],
      Balance: [balance.balance, 'plainText'],
    };
  });

  // handlers
  const onAssetSearch = (query) => {
    setAssetQuery(query);
  };

  const onVestingSearch = (query) => {
    setVestingQuery(query);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <BlockWrapper>
          <Label>
            2 Asset balances
            <SearchBox
              placeholder="Search for balance"
              onSearch={onAssetSearch}
            />
          </Label>
          {asset_rows ? (
            <Table headers={headers} rows={asset_rows}></Table>
          ) : (
            <Loader />
          )}
        </BlockWrapper>
        <BlockWrapper>
          <Label>
            Vesting balances
            <SearchBox
              placeholder="Search for vesting balance"
              onSearch={onVestingSearch}
            />
          </Label>
          {vesting_rows ? (
            <Table headers={headers} rows={vesting_rows}></Table>
          ) : (
            <Loader />
          )}
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Balances;
