import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Table } from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';
import { SearchBox } from '../../../components/SearchBox';

// import redux
import actions from '../../../store/actions';
import selectors from '../../../store/selectors';

import images from '../../../helpers/images';
import {
  buildCustomKVTableDto,
  localizeNumber,
} from '../../../helpers/utility';

const {
  fetchAssetFull,
  fetchAssetHolders,
  fetchAssetHoldersCount,
  fetchAssetMarkets,
} = actions;
const {
  getAssetFull,
  isFetchingAssetFull,
  getAssetHolders,
  isFetchingAssetHolders,
  getAssetHoldersCount,
  isFetchingAssetHoldersCount,
  getAssetMarkets,
  isFetchingAssetMarkets,
} = selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 40px;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  &.active_markets {
    @media only screen and (max-width: 600px) {
      margin-top: 30px;
    }
  }

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

const BlockWrapper = styled.div`
  margin-top: 38px;
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;

  &.additional {
    @media only screen and (max-width: 980px) {
      display: none;
    }
  }

  &.additional_d {
    display: none;
    @media only screen and (max-width: 980px) {
      display: flex;
    }
  }

  @media only screen and (max-width: 980px) {
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 100%;
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

const Asset = () => {
  const [queryMarkets, setQueryMarkets] = useState('');
  const [queryHolders, setQueryHolders] = useState('');

  // dispatch
  const dispatch = useDispatch();
  const location = useLocation();

  // actions
  const fetchAssetFullData = (id) => dispatch(fetchAssetFull(id));
  const fetchAssetHoldersData = (id) => dispatch(fetchAssetHolders(id));
  const fetchAssetHoldersCountData = (id) =>
    dispatch(fetchAssetHoldersCount(id));
  const fetchAssetMarketsData = (id) => dispatch(fetchAssetMarkets(id));

  // selectors
  const getAssetFullData = useSelector(getAssetFull);
  const isFetchingAssetFullData = useSelector(isFetchingAssetFull);
  const getAssetHoldersData = useSelector(getAssetHolders);
  const isFetchingAssetHoldersData = useSelector(isFetchingAssetHolders);
  const getAssetHoldersCountData = useSelector(getAssetHoldersCount);
  const isFetchingAssetHoldersCountData = useSelector(
    isFetchingAssetHoldersCount,
  );
  const getAssetMarketsData = useSelector(getAssetMarkets);
  const isFetchingAssetMarketsData = useSelector(isFetchingAssetMarkets);

  // vars
  const market_headers = ['Name', 'Price', 'Volume'];
  const holder_headers = ['Account', 'Amount'];
  const headerStatsM = [
    { '24 HS META1 Volume': 'volume', type: 'plainText' },
    { 'Accumulated fees': 'accumulated_fees', type: 'plainText' },
    { Holders: 'holders', type: 'plainText' },
    {
      'Asset Properties': 'dynamic_asset_data_id',
      type: 'html',
      link: `/objects/${getAssetFullData?.dynamic_asset_data_id}/`,
    },
  ];
  const headerInfoM = [
    { Description: 'options.description', type: 'plainText' },
    { 'Max supply': 'options.max_supply', type: 'plainText' },
    {
      Issuer: 'issuer_name',
      type: 'html',
      link: `/accounts/${getAssetFullData?.issuer}/`,
    },
    { Precision: 'precision', type: 'plainText' },
    { 'Fee pool': 'fee_pool', type: 'plainText' },
    { 'Current supply': 'current_supply', type: 'plainText' },
    { 'Confidential supply': 'confidential_supply', type: 'plainText' },
  ];
  const id = location.pathname.split('/')[2];
  const imgUrl = images[`coin-${getAssetFullData?.symbol.toLowerCase()}`];
  const statsRows = buildCustomKVTableDto(getAssetFullData, headerStatsM);
  const infoRows = buildCustomKVTableDto(getAssetFullData, headerInfoM);
  const marketRows = getAssetMarketsData
    ?.filter((data) => data.pair.includes(queryMarkets.toUpperCase()))
    .map((data) => {
      return {
        Name: [`<a href='/markets/${data.pair}'>${data.pair}</a>`, 'html'],
        Price: [localizeNumber(data.latest_price), 'plainText'],
        Volume: [localizeNumber(data['24h_volume']), 'plainText'],
      };
    });
  const holderRows = getAssetHoldersData
    ?.filter((data) => data.name.includes(queryHolders))
    .map((data) => {
      return {
        Account: [
          `<a href='/accounts/${data.account_id}'>${data.name}</a>`,
          'html',
        ],
        Amount: [localizeNumber(data.amount), 'plainText'],
      };
    });

  useEffect(() => {
    fetchAssetFullData(id);
    fetchAssetHoldersData(id);
    fetchAssetHoldersCountData(id);
    fetchAssetMarketsData(id);
  }, []);

  useEffect(() => {
    if (getAssetFullData) getAssetFullData.holders = getAssetHoldersCountData;
  }, [
    getAssetFullData,
    getAssetHoldersData,
    getAssetHoldersCountData,
    getAssetMarketsData,
  ]);

  const onSearchForActiveMarkets = (query) => {
    setQueryMarkets(query);
  };

  const onSearchForTopHolders = (query) => {
    setQueryHolders(query);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <BlockWrapper width="30%" style={{ minWidth: '300px' }}>
          <Img src={imgUrl}></Img>
        </BlockWrapper>
        <BlockWrapper width="45%">
          <Label>Stats</Label>
          <div style={{ width: '100%' }}>
            <Table
              headers={['Key', 'Value']}
              rows={statsRows}
              lastcellaligned={false}
              cellHeight="10px"
            ></Table>
          </div>
          {isFetchingAssetFullData && isFetchingAssetHoldersCountData && (
            <Loader />
          )}
          <div
            style={{
              fontSize: '32px',
              width: '100px',
              color: 'white',
              marginTop: '10px',
            }}
          >
            {getAssetFullData?.symbol.toUpperCase()}
          </div>
          <div style={{ color: 'white' }}>
            <p style={{ margin: 0 }}>
              User Issued -{' '}
              <a
                href={`/objects/${getAssetFullData?.id}/`}
                style={{ color: 'white' }}
              >
                {getAssetFullData?.id}
              </a>
            </p>
          </div>
        </BlockWrapper>
        <BlockWrapper className="additional">
          <Label>Additional asset information</Label>
          <div style={{ width: '100%' }}>
            <Table
              headers={['Key', 'Value']}
              rows={infoRows}
              lastcellaligned={false}
              cellHeight="10px"
            ></Table>
          </div>
          {isFetchingAssetFullData && isFetchingAssetHoldersCountData && (
            <Loader />
          )}
        </BlockWrapper>
      </StyledContainer>
      <StyledContainer>
        <BlockWrapper className="additional_d">
          <Label>Additional asset information</Label>
          <div style={{ width: '100%' }}>
            <Table
              headers={['Key', 'Value']}
              rows={infoRows}
              lastcellaligned={false}
              cellHeight="10px"
            ></Table>
          </div>
          {isFetchingAssetFullData && isFetchingAssetHoldersCountData && (
            <Loader />
          )}
        </BlockWrapper>
      </StyledContainer>
      <StyledColumnContainer className="active_markets">
        <Label>
          Active markets
          <SearchBox
            placeholder="Search for a market"
            onSearch={onSearchForActiveMarkets}
          />
        </Label>
        {!isFetchingAssetMarketsData && marketRows ? (
          <Table headers={market_headers} rows={marketRows}></Table>
        ) : (
          <Loader />
        )}
      </StyledColumnContainer>
      <StyledColumnContainer style={{ marginTop: '42px' }}>
        <Label>
          Top holders
          <SearchBox
            placeholder="Search for a holder"
            onSearch={onSearchForTopHolders}
          />
        </Label>
        {!isFetchingAssetHoldersData && holderRows ? (
          <Table headers={holder_headers} rows={holderRows}></Table>
        ) : (
          <Loader />
        )}
      </StyledColumnContainer>
    </PageWrapper>
  );
};

export default Asset;
