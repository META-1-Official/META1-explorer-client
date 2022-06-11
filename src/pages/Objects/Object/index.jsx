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
import icons from '../../../helpers/icons';
import useWidth from '../../../helpers/getWidth';

// import api
import api from '../../../store/apis';
import { useTranslation } from 'react-i18next';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media only screen and (max-width: 1140px) {
    padding-top: 50px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
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

  #obj-outer-box {
    @media ${(props) => props.theme.bkps.device.mobile} {
      padding-left: 16px;
    }
    #obj-container {
      border: 1px solid rgba(194, 213, 225, 0.08);
      border-radius: 5px;
      #obj-body {
        background: transparent !important;
        font-size: 13px !important;
      }
    }
  }
`;

const Object = () => {
  const [object, setObject] = useState('');

  // hooks
  const location = useLocation();
  const width = useWidth();
  const { t } = useTranslation();

  // vars
  const id = location.pathname.split('/')[2];

  const object_row = [
    {
      Key: ['Object type', 'plainText'],
      Value: [object?.type, 'plainText'],
    },
  ];

  useEffect(() => {
    (async () => {
      const parsed = await api.getObject(id);
      setObject(parsed?.data);
    })();
  }, []);

  return (
    <PageWrapper>
      <StyledContainer>
        <BlockWrapper>
          <Label>{`${t('Exploring Object')}` + ': ' + `${id}`}</Label>
          {object ? (
            <Table
              headers={['Key', 'Value']}
              rows={object_row}
              cellHeight="10px"
            ></Table>
          ) : (
            <Loader />
          )}
        </BlockWrapper>
      </StyledContainer>
      <StyledContainer>
        <BlockWrapper>
          <Label>{t('Object raw data')}</Label>
          <JsonInputWrapper>
            <JSONInput
              id="obj"
              placeholder={object ? object.raw : { data: 'object raw data' }}
              locale={locale}
              theme="dark_vscode_tribute"
              width={width - 32}
              viewOnly={true}
              confirmGood={false}
            />
          </JsonInputWrapper>
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Object;
