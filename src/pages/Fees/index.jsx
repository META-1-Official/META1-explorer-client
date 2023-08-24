import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as styled from './Fees.styles';

import Pagination from '@mui/material/Pagination';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import { SearchBox } from '../../components/SearchBox';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import PageLabel from '../../components/PageLabel.jsx';
import { fixNumberOnPrecision } from '../../helpers/utility';
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
  const getFeesData = useSelector(getFees);
  const isFetchingFeesData = useSelector(isFetchingFees);
  const meta1 = useSelector(getAssetFull);

  // const functions

  // vars
  const filteredData = feesRowsBuilder(getFeesData)?.filter((data) =>
    data.operation.includes(query.toUpperCase()),
  );

  const curPageOps = filteredData; // current page markets - 20 markets per page

  const headers = ['ID', 'Operation', 'Standard Fee', 'Lifetime Member Fee']; // table headers
  const rows = curPageOps?.map((fee) => {
    return {
      ID: [fee.identifier, 'plainText'],
      Operation: [fee.type, 'label'],
      'Standard Fee': [
        fee.basic_fee
          ? fixNumberOnPrecision(fee.basic_fee, meta1?.precision || 9)
          : fee.basic_fee,
        'plainText',
      ],
      'Lifetime Member Fee': [
        fee.price_per_kbyte
          ? fixNumberOnPrecision(fee.price_per_kbyte, meta1?.precision || 9)
          : fee.price_per_kbyte,
        'plainText',
      ],
    };
  });

  useEffect(() => {
    const fetchFeesData = () => dispatch(fetchFees());
    const fetchAssetData = () => dispatch(fetchAssetFull('1.3.0'));

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
        {!isFetchingFeesData && rows ? (
          <Table
            headers={headers}
            rows={rows}
            headerText={'FEE SCHEDULE'}
            withSearch
            lastcellaligned={false}
            onSearch={onSearch}
            searchText={'Search for a fee'}
            isFees
          ></Table>
        ) : (
          <Loader />
        )}
      </styled.StyledContainer>
    </styled.PageWrapper>
  );
};

export default Fees;
