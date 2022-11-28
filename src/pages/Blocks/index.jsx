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
import EmptyResultsBlock from '../../components/EmptyResultsBlock';

const { fetchBigBlocks } = actions;
const { getBigBlocks, isFetchingBigBlocks } = selectors;

const Blocks = () => {
  const [rows, setRows] = useState([]);
  const [rowsPerPage, serRowsPerPage] = useState(20);
  const [query, setQuery] = useState('');

  // dispatch
  const dispatch = useDispatch();

  const fetchBigBlocksData = (size) => dispatch(fetchBigBlocks(size));

  // selectors
  const getBigBlocksData = useSelector(getBigBlocks);
  const isFetchingBigBlocksData = useSelector(isFetchingBigBlocks);

  // vars
  const headers = ['BLOCK NUMBER', 'DATE', 'Transactions', 'Operations']; // table headers
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
                DATE: [blockPromise.data.timestamp, 'plainText'],
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

  const filteredRows = rows.filter((row) =>
    row['BLOCK NUMBER'][0]?.split('>')[1].split('<')[0].startsWith(query),
  );
  const onSearch = (value) => {
    setQuery(value);
  };
  return (
    <PageWrapper>
      <StyledContainer>
        <PageLabel>{t('BLOCKS')}</PageLabel>
        <text
          style={{
            display: 'block',
            color: 'white',
            marginTop: '-20px',
            marginBottom: '20px',
            fontSize: '12px',
            fontStyle: 'italic',
          }}
        >
          {t('Biggest blocks in the last 1 hour')}
        </text>
        {!isFetchingBigBlocksData && rows && (
          <>
            <Table
              headers={headers}
              rows={filteredRows}
              withSearch
              headerText={'BIGGEST BLOCKS'}
              searchText={'Search for a Block number'}
              onSearch={onSearch}
            ></Table>
            {rows?.length && !filteredRows?.length && <EmptyResultsBlock />}
            <PaginationWrapper>
              <PaginationSelect
                value={rowsPerPage}
                onChange={changeRowsPerPageHandler}
              />
            </PaginationWrapper>
          </>
        )}
        {isFetchingBigBlocksData && !rows && <Loader />}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Blocks;
