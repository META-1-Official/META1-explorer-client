import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// import components
import { Table } from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';
import { SearchBox } from '../../../components/SearchBox';

// import services
import accountsService from '../../../services/accounts.services';
import { useTranslation } from 'react-i18next';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;

  @media ${(props) => props.theme.bkps.device.mobile} {
    flex-direction: column;
  }
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

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
    flex-direction: column;
  }
`;

const BlockWrapper = styled.div`
  margin-top: 38px;
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    margin-left: 0;
    margin-right: 0;
    align-items: center;
  }
`;

const Balances = ({ accountFullData }) => {
  const [assetQuery, setAssetQuery] = useState('');
  const [vestingQuery, setVestingQuery] = useState('');
  const [parsedAssetBalances, setParsedAssetBalances] = useState([]);
  const [parsedVestingBalances, setParsedVestingBalances] = useState([]);

  const { t } = useTranslation();

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
    balance.asset_name?.includes(assetQuery.toUpperCase()),
  );

  const filteredVestingData = parsedVestingBalances?.filter((balance) =>
    balance.asset_name?.includes(vestingQuery.toUpperCase()),
  );

  const headers = ['Id', 'Asset', 'Balance']; // table headers
  const asset_rows = filteredAssetData?.map((balance) => {
    return {
      Id: [`<a href="/objects/${balance.id}">${balance.id}</a>`, 'html'],
      Asset: [
        `<a href="/assets/${balance.asset}">${balance.asset_name}</a>`,
        'html',
      ],
      Balance: [balance.balance, 'plainText'],
    };
  });

  const vesting_rows = filteredVestingData?.map((balance) => {
    return {
      Id: [`<a href="/objects/${balance.id}">${balance.id}</a>`, 'html'],
      Asset: [
        `<a href="/assets/${balance.asset}">${balance.asset_name}</a>`,
        'html',
      ],
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
          <div style={{ width: '100%' }}>
            {asset_rows ? (
              <Table
                headers={headers}
                withSearch
                searchText={'Search for balance'}
                onSearch={onAssetSearch}
                headerText={`${parsedAssetBalances?.length} ${t(
                  'Asset balances',
                )}`}
                rows={asset_rows}
              ></Table>
            ) : (
              <Loader />
            )}
          </div>
        </BlockWrapper>
        <BlockWrapper>
          <div style={{ width: '100%' }}>
            {vesting_rows ? (
              <Table
                headers={headers}
                headerText={'Vesting balances'}
                withSearch
                searchText={'Search for vesting balance'}
                onSearch={onVestingSearch}
                rows={vesting_rows}
              ></Table>
            ) : (
              <Loader />
            )}
          </div>
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Balances;
