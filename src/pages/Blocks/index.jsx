import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';

// import api
import { fetchBlock } from '../../store/apis/explorer';
// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';
import PageLabel from '../../components/PageLabel.jsx';
import { useTranslation } from 'react-i18next';
import PaginationSelect from '../../components/AppPagination/PaginationSelect';
import {
  PageWrapper,
  PaginationWrapper,
  StyledContainer,
} from '../Transactions/Transactions.styles';

const { fetchBigBlocks } = actions;
const { getBigBlocks, isFetchingBigBlocks } = selectors;

const Blocks = () => {
  const [rows, setRows] = useState([]);
  const [rowsPerPage, serRowsPerPage] = useState(20);

  // dispatch
  const dispatch = useDispatch();

  const fetchBigBlocksData = (size) => dispatch(fetchBigBlocks(size));

  // selectors
  const getBigBlocksData = useSelector(getBigBlocks);
  const isFetchingBigBlocksData = useSelector(isFetchingBigBlocks);

  // vars
  const headers = ['BLOCK NUMBER', 'DATA', 'Transactions', 'Operations']; // table headers
  const buildFetchBlockPromises = (getBigBlocksData) =>
    getBigBlocksData.map((block) => fetchBlock(block.key));

  const getRows = () => {
    return getBigBlocksData
      ? Promise.all(buildFetchBlockPromises(getBigBlocksData)).then(
          (blockPromises) => {
            return blockPromises.map((blockPromise, index) => {
              const block = getBigBlocksData[index];
              return {
                'BLOCK NUMBER': [
                  `<a href="/blocks/${block.key}">${block.key}</a>`,
                  'html',
                ],
                DATA: [blockPromise.data.timestamp, 'plainText'],
                Transactions: [
                  blockPromise.data.transactions.length,
                  'plainText',
                ],
                Operations: [block.doc_count, 'plainText'],
              };
            });
          },
        )
      : Promise.resolve([]);
  };

  useEffect(() => {
    fetchBigBlocksData(rowsPerPage); // fetch big trxs
  }, [rowsPerPage]);

  const { t } = useTranslation();

  const [v, setV] = useState(false); // the flag var for fethcing for only change
  useEffect(() => {
    if (getBigBlocksData && !v) {
      setV(true);
      getRows().then((rws) => setRows(rws));
    }
  }, [getBigBlocksData]);

  const changeRowsPerPageHandler = ({ target }) => {
    const { value } = target;
    serRowsPerPage(value);
    setV(false);
    setRows([]);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <PageLabel>{t('BLOCKS')}</PageLabel>
        {!isFetchingBigBlocksData && rows && rows.length !== 0 ? (
          <>
            <Table headers={headers} rows={rows}></Table>
            <PaginationWrapper>
              <PaginationSelect
                value={rowsPerPage}
                onChange={changeRowsPerPageHandler}
              />
            </PaginationWrapper>
          </>
        ) : (
          <Loader />
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Blocks;
