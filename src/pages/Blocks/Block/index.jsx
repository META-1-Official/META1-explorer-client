import React, { useEffect, useState } from 'react';
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
import BlockWrapper from '../../../components/BlockWrapper';
import {
  ButtonGroup,
  JsonInputWrapper,
  Label,
  PageWrapper,
  StyledContainer,
} from './Block.styles';

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
