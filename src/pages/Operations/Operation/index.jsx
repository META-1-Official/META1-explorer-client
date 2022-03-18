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

const Html = styled.div`
  color: ${(props) => props.theme.palette.text.third};
  font-weight: 300;
  align-items: center;
  display: flex;
  width: 100%;
  font-size: 20px;

  a {
    color: white;
    font-weight: 600;
  }
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

  #opt-outer-box {
    #opt-container {
      border: 1px solid rgba(194, 213, 225, 0.08);
      border-radius: 5px;
      #opt-body {
        background: transparent !important;
        font-size: 13px !important;
      }
    }
  }
`;

const Votes = () => {
  const [operation, setOperation] = useState('');

  // hooks
  const location = useLocation();

  // vars
  const id = location.pathname.split('/')[2];
  const headerM = [
    {Type: 'type', type: 'label'},
    {'Fee': 'fee', type: 'plainText'},
    {
      'Operation in transaction': 'op_in_trx',
      type: 'plainText',
    },
    {
      'Transaction in block': 'trx_in_block',
      type: 'plainText',
    },
    {
      'Virtual operation': 'virtual_op',
      type: 'plainText',
    },
    {
      'Block': 'block_num',
      type: 'html',
      link: `/blocks/${operation?.block_num}`
    },
    {
      'Operation time': 'block_time',
      type: 'plainText',
    },
    {
      'Transaction': 'trx_id',
      type: 'html',
      link: `/txs/${operation?.trx_id}`
    },
  ];
  const opt_rows = buildCustomKVTableDto(operation, headerM);
  const summary = `<div>${operation?.operation_text}</div>`;

  useEffect(() => {
    (async () => {
      const parsed = await api.getOperation(id);
      console.log(parsed?.data)
      setOperation(parsed?.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <StyledContainer>
        <BlockWrapper>
          <Label>Exploring operation ID: {id}</Label>       
          {operation && opt_rows ? (
            <Table
              headers={['Key', 'Value']}
              rows={opt_rows}
              cellHeight="10px"
              lastcellaligned={false}
            ></Table>
          ) : (
            <Loader />
          )}
        </BlockWrapper>
        <BlockWrapper>
          <Label>Summary</Label>
          <Html dangerouslySetInnerHTML={{__html: summary}} />
        </BlockWrapper>
      </StyledContainer>
      <StyledContainer>
        <BlockWrapper>
          <Label>Operation raw data</Label>
          <JsonInputWrapper>
            <JSONInput
              id="opt"
              placeholder={
                operation ? operation.raw : {data: 'operation raw data'}
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
