import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

// import components
import { Table } from '../../../components/Table';
import Button from '@mui/material/Button';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import Loader from '../../../components/Loader/Loader';

// import utils
import { buildCustomKVTableDto } from '../../../helpers/utility';
import icons from '../../../helpers/icons';
import useWidth from '../../../helpers/getWidth';

// import api
import api from '../../../store/apis';
import { useTranslation } from 'react-i18next';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media ${(props) => props.theme.bkps.device.mobile} {
    margin-top: 50px;
  }
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
  }
`;

const JsonInputWrapper = styled.div`
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  padding-bottom: 50px;

  #trd-outer-box {
    @media ${(props) => props.theme.bkps.device.mobile} {
      padding-left: 16px;
    }
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
  const width = useWidth();
  const { t } = useTranslation();

  // vars
  const block_num = location.pathname.split('/')[2];
  const headerM = [
    { 'Previous table_key': 'previous', type: 'plainText' },
    { 'Date and time': 'timestamp', type: 'plainText' },
    {
      'Merkle Root': 'transaction_merkle_root',
      type: 'plainText',
    },
    {
      'Witness table_key': 'witness',
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
              {t('Prev Block')} (#{block.prev})
            </Button>
            <Button variant="text">
              {t('Current Block')} (#{block_num})
            </Button>
            <Button
              href={`/blocks/${block?.next}`}
              endIcon={icons['next']}
              variant="text"
            >
              {t('Next Block')} (#{block.next})
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
          <Label>{t('Transactions raw data')}</Label>
          <JsonInputWrapper>
            <JSONInput
              id="trd"
              placeholder={
                block ? block.transactions : { data: 'transacton raw data' }
              }
              locale={locale}
              theme="dark_vscode_tribute"
              width={width - 32}
              viewOnly={true}
              confirmGood={false}
              reset={true}
            />
          </JsonInputWrapper>
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Votes;
