import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useLocation} from 'react-router-dom';

// import components
import {Table} from '../../../components/Table';
import Button from '@mui/material/Button';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import Loader from '../../../components/Loader/Loader';

// import utils
import {buildCustomKVTableDto} from '../../../helpers/utility';
import icons from '../../../helpers/icons';

// import api
import api from '../../../store/apis';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  font-size: 20px;
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

const JsonInputWrapper = styled.div`
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  padding-bottom: 50px;

  #trd-outer-box {
    #trd-container {
      border: 1px solid rgba(194, 213, 225, 0.08);
      border-radius: 5px;
      #trd-body {
        background: transparent !important;
        font-size: 13px !important;
      }
    }
  }
`;

const Votes = () => {
  const [block, setBlock] = useState('');

  // hooks
  const location = useLocation();

  // vars
  const block_num = location.pathname.split('/')[2];
  const headerM = [
    {Previous: 'previous', type: 'plainText'},
    {'Date and time': 'timestamp', type: 'plainText'},
    {
      'Merkle Root': 'transaction_merkle_root',
      type: 'plainText',
    },
    {
      Witness: 'witness',
      type: 'plainText',
    },
    {
      'Witness signature': 'witness_signature',
      type: 'plainText',
    },
    {
      'Transactions in block': 'transactions_count',
      type: 'plainText',
    },
    {
      'Operations in block': 'operations_count',
      type: 'plainText',
    },
  ];
  const block_rows = buildCustomKVTableDto(block, headerM);

  useEffect(() => {
    (async () => {
      const parsed = await api.fetchBlock(block_num);
      setBlock(parsed?.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <StyledContainer>
        <BlockWrapper>
          <ButtonGroup>
            <Button
              href={`/blocks/${block?.prev}`}
              startIcon={icons['prev']}
              variant="text"
            >
              Prev Block (#{block.prev})
            </Button>
            <Button variant="text">Current Block (#{block_num})</Button>
            <Button
              href={`/blocks/${block?.next}`}
              endIcon={icons['next']}
              variant="text"
            >
              Next Block (#{block.next})
            </Button>
          </ButtonGroup>
          {block && block_rows ? (
            <Table
              headers={['Key', 'Value']}
              rows={block_rows}
              cellHeight="10px"
            ></Table>
          ) : (
            <Loader />
          )}
        </BlockWrapper>
      </StyledContainer>
      <StyledContainer>
        <BlockWrapper>
          <Label>Transactions raw data</Label>
          <JsonInputWrapper>
            <JSONInput
              id="trd"
              placeholder={
                block ? block.transactions : {data: 'transacton raw data'}
              }
              locale={locale}
              theme="dark_vscode_tribute"
              width="100%"
              viewOnly={true}
              confirmGood={false}
            />
          </JsonInputWrapper>
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Votes;
