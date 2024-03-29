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

const { fetchBigBlocks } = actions;
const { getBigBlocks, isFetchingBigBlocks } = selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 38px;
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  margin-bottom: 10px;
  margin-top: 10px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
  }
`;

const Blocks = () => {
  const [rows, setRows] = useState([]);

  // dispatch
  const dispatch = useDispatch();

  const fetchBigBlocksData = () => dispatch(fetchBigBlocks());

  // selectors
  const getBigBlocksData = useSelector(getBigBlocks);
  const isFetchingBigBlocksData = useSelector(isFetchingBigBlocks);

  // vars
  const headers = ['Block Number', 'Data', 'Transactions', 'Operations']; // table headers
  const buildFetchBlockPromises = (getBigBlocksData) =>
    getBigBlocksData.map((block) => fetchBlock(block.key));

  const getRows = () => {
    return getBigBlocksData
      ? Promise.all(buildFetchBlockPromises(getBigBlocksData)).then(
          (blockPromises) => {
            return blockPromises.map((blockPromise, index) => {
              const block = getBigBlocksData[index];
              return {
                'Block Number': [
                  `<a href="/blocks/${block.key}">${block.key}</a>`,
                  'html',
                ],
                Data: [blockPromise.data.timestamp, 'plainText'],
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
    fetchBigBlocksData(); // fetch big trxs
  }, []);

  const [v, setV] = useState(false); // the flag var for fethcing for only change
  useEffect(() => {
    if (getBigBlocksData && !v) {
      setV(true);
      getRows().then((rws) => setRows(rws));
    }
  }, [getBigBlocksData]);

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>Blocks</Label>
        {!isFetchingBigBlocksData && rows && rows.length !== 0 ? (
          <Table headers={headers} rows={rows}></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Blocks;
