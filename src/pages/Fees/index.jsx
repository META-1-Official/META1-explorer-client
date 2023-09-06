import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as styled from './Fees.styles';

import Divider from '@mui/material/Divider';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';
import { feesRowsBuilder } from '../../helpers/rowBuilders';
import { PageDescription } from './Fees.styles';

const { fetchFees, fetchAssetFull } = actions;
const { getFees, isFetchingFees, getAssetFull } = selectors;

const Fees = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { t } = useTranslation();
  // dispatch
  const dispatch = useDispatch();

  // selectors
  const feesData = useSelector(getFees);
  const isFetchingFeesData = useSelector(isFetchingFees);
  const meta1 = useSelector(getAssetFull);

  const fetchFeesData = () => dispatch(fetchFees());
  const fetchAssetData = () => dispatch(fetchAssetFull('1.3.0'));

  const allFeesData = feesData?.parameters.current_fees.parameters || [];

  const headers = [
    'Operation',
    'Fee Type',
    'Standard Fee',
    'Lifetime Member Fee',
  ]; // table headers

  const filteredData = feesRowsBuilder(
    allFeesData,
    meta1?.precision || 9,
  )?.filter((data) => data.operation.includes(query.toUpperCase()));

  const generalFees = [0, 25, 26, 27, 28, 32, 33, 39, 41];
  const generalFeesData = filteredData.filter((feeType) =>
    generalFees.includes(feeType.type),
  );

  const assetSpecificFees = [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 38, 43, 47, 48,
  ];
  const assetSpecificFeesData = filteredData.filter((feeType) =>
    assetSpecificFees.includes(feeType.type),
  );

  const marketSpecificFees = [1, 2, 3, 4, 5];
  const marketSpecificFeesData = filteredData.filter((feeType) =>
    marketSpecificFees.includes(feeType.type),
  );

  const walletSpecificFees = [5, 6, 7, 8, 9];
  const walletSpecificFeesData = filteredData.filter((feeType) =>
    walletSpecificFees.includes(feeType.type),
  );

  const businessAdmFees = [20, 21, 22, 23, 24, 29, 30, 31, 34, 35, 36];
  const businessAdmFeesData = filteredData.filter((feeType) =>
    businessAdmFees.includes(feeType.type),
  );

  useEffect(() => {
    fetchFeesData();
    fetchAssetData();
  }, []);

  // handlers

  const onSearch = (query) => {
    setQuery(query);
  };

  return (
    <styled.PageWrapper>
      <styled.StyledContainer>
        <PageLabel>{t('FEES')}</PageLabel>
        <PageDescription>
          {t(
            'In the META1 ecosystem every operation is assigned an individual fee. These fees are subject to change. However, they are defined solely by shareholder approval, thus each and every shareholder of the META1 core asset (META1) has a say as to what the fees should be. If shareholders can be convinced to reduce a certain fee and consensus is reached, the fee will be reduced automatically by the blockchain. Changes of blockchain parameters are proposed by members of the committee. These members are voted by shareholders and improve the flexibility and reaction rate.',
          )}
        </PageDescription>
        {!isFetchingFeesData ? (
          <>
            {generalFeesData && (
              <Table
                headers={headers}
                rows={generalFeesData}
                headerText={'GENERAL'}
                withSearch
                lastcellaligned={false}
                onSearch={onSearch}
                searchText={'Search for a fee'}
                isFees
              ></Table>
            )}
            {assetSpecificFeesData && (
              <Table
                headers={headers}
                withHeader
                rows={assetSpecificFeesData}
                headerText={'ASSET-SPECIFIC'}
                lastcellaligned={false}
                isFees
              ></Table>
            )}
            {marketSpecificFeesData && (
              <Table
                headers={headers}
                withHeader
                rows={marketSpecificFeesData}
                headerText={'MARKET-SPECIFIC'}
                lastcellaligned={false}
                isFees
              />
            )}
            <Divider />
            {walletSpecificFeesData && (
              <Table
                headers={headers}
                withHeader
                rows={walletSpecificFeesData}
                headerText={'WALLET-SPECIFIC'}
                lastcellaligned={false}
                isFees
              ></Table>
            )}
            {businessAdmFeesData && (
              <Table
                headers={headers}
                withHeader
                rows={businessAdmFeesData}
                headerText={'BUSINESS ADMINISTRATION'}
                lastcellaligned={false}
                isFees
              ></Table>
            )}
          </>
        ) : (
          <Loader />
        )}
      </styled.StyledContainer>
    </styled.PageWrapper>
  );
};

export default Fees;
