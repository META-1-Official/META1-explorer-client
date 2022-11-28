import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Table } from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';

// import redux
import actions from '../../../store/actions';
import selectors from '../../../store/selectors';

import images from '../../../helpers/images';
import {
  buildCustomKVTableDto,
  localizeNumber,
} from '../../../helpers/utility';
import { useTranslation } from 'react-i18next';
import BlockWrapper from '../../../components/BlockWrapper';

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
  margin-bottom: 1rem;

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

const AssetInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #15171b;
  border: 1px solid #1c1f27;
  border-radius: 10px;
  padding: 20px;
  margin-top: 17px;
`;

const Asset = () => {
  const [queryHolders, setQueryHolders] = useState('');

  // dispatch
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  // actions
  const fetchAssetFullData = (id) => dispatch(fetchAssetFull(id));
  const fetchAssetHoldersData = (id) => dispatch(fetchAssetHolders(id));
  const fetchAssetHoldersCountData = (id) =>
    dispatch(fetchAssetHoldersCount(id));

  // selectors
  const getAssetFullData = useSelector(getAssetFull);
  const isFetchingAssetFullData = useSelector(isFetchingAssetFull);
  const getAssetHoldersData = useSelector(getAssetHolders);
  const isFetchingAssetHoldersData = useSelector(isFetchingAssetHolders);
  const getAssetHoldersCountData = useSelector(getAssetHoldersCount);
  const isFetchingAssetHoldersCountData = useSelector(
    isFetchingAssetHoldersCount,
  );

  // vars
  const holder_headers = ['Account', 'Amount'];
  const headerStatsM = [
    { 'Accumulated fees': 'accumulated_fees', type: 'plainText' },
    { 'Holders table_key': 'holders', type: 'plainText' },
    {
      'Asset Properties': 'dynamic_asset_data_id',
      type: 'html',
      link: `/objects/${getAssetFullData?.dynamic_asset_data_id}/`,
    },
  ];
  const headerInfoM = [
    { 'Description table_key': 'options.description', type: 'plainText' },
    { 'Max supply': 'options.max_supply', type: 'plainText' },
    {
      'Issuer table_key': 'issuer_name',
      type: 'html',
      link: `/accounts/${getAssetFullData?.issuer}/`,
    },
    { 'Precision table_key': 'precision', type: 'plainText' },
    { 'Fee pool': 'fee_pool', type: 'plainText' },
    { 'Current supply': 'current_supply', type: 'plainText' },
    { 'Confidential supply': 'confidential_supply', type: 'plainText' },
  ];
  const id = location.pathname.split('/')[2];
  const imgUrl = images[`coin-${getAssetFullData?.symbol.toLowerCase()}`];
  const statsRows = buildCustomKVTableDto(getAssetFullData, headerStatsM);
  const infoRows = buildCustomKVTableDto(getAssetFullData, headerInfoM);
  const holderRows = getAssetHoldersData
    ?.filter((data) => data.name.includes(queryHolders))
    .map((data) => {
      return {
        Account: [
          `<a href='/accounts/${data.account_id}'>${data.name}</a>`,
          'html',
        ],
        Amount: [
          localizeNumber(
            (+data.amount / 10 ** getAssetFullData.precision).toFixed(
              getAssetFullData.precision,
            ),
          ),
          'plainText',
        ],
      };
    });

  useEffect(() => {
    fetchAssetFullData(id);
    fetchAssetHoldersData(id);
    fetchAssetHoldersCountData(id);
  }, []);

  useEffect(() => {
    if (getAssetFullData) getAssetFullData.holders = getAssetHoldersCountData;
  }, [getAssetFullData, getAssetHoldersData, getAssetHoldersCountData]);

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
          <Label>{t('Stats')}</Label>
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
          <AssetInfoWrapper>
            <div
              style={{
                fontSize: '32px',
                width: '100px',
                color: 'white',
                fontWeight: '600',
                marginBottom: '10px',
              }}
            >
              {getAssetFullData?.symbol.toUpperCase()}
            </div>
            <div style={{ color: 'white' }}>
              <p style={{ margin: 0 }}>
                {t('User Issued')} -{' '}
                <a
                  href={`/objects/${getAssetFullData?.id}/`}
                  style={{ color: 'gold', textDecoration: 'none' }}
                >
                  {getAssetFullData?.id}
                </a>
              </p>
            </div>
          </AssetInfoWrapper>
        </BlockWrapper>
        <BlockWrapper className="additional">
          <Label>{t('Additional asset information')}</Label>
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
          <Label>{t('Additional asset information')}</Label>
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
      <StyledColumnContainer style={{ marginTop: '42px' }}>
        {!isFetchingAssetHoldersData && holderRows ? (
          <Table
            withSearch
            onSearch={onSearchForTopHolders}
            searchText={'Search for a holders'}
            headerText={'TOP HOLDERS'}
            headers={holder_headers}
            rows={holderRows}
          ></Table>
        ) : (
          <Loader />
        )}
      </StyledColumnContainer>
    </PageWrapper>
  );
};

export default Asset;
