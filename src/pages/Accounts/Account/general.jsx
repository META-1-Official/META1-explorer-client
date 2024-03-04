import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';
import { buildCustomKVTableDto } from '../../../helpers/utility';
import accountsService from '../../../services/accounts.services';
import Identicon from 'react-identicons';
import { useTranslation } from 'react-i18next';
import BlockWrapper from '../../../components/BlockWrapper';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledIdenticon = styled(Identicon)`
  canvas {
    width: 100px;
    height: 100px;
  }
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const General = ({ accountFullData }) => {
  const [parsedAccount, setParsedAccount] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAccountData = async () => {
      if (accountFullData) {
        const parsed = await accountsService.getAccountFullData(
          accountFullData,
        );
        setParsedAccount(parsed);
      }
    };

    fetchAccountData();
  }, [accountFullData]);

  const generateHeaderInfoRows = () => {
    const headerInfoM = [
      {
        'ID table_key': 'id',
        type: 'html',
        link: `/accounts/${parsedAccount?.id}/`,
      },
      { 'Name table_key': 'name', type: 'plainText' },
      {
        'Referer table_key': 'referer',
        type: 'html',
        link: `/accounts/${parsedAccount?.referer}/`,
      },
      {
        'Registrar table_key': 'registrar',
        type: 'html',
        link: `/accounts/${parsedAccount?.registrar}/`,
      },
      {
        'Voting as': 'voting_account_name',
        type: 'html',
        link: `/accounts/${parsedAccount?.voting_account_name}`,
      },
    ];
    return buildCustomKVTableDto(parsedAccount, headerInfoM);
  };

  const generateHeaderStatsRows = () => {
    const headerStatsM = [
      { 'META1 Balance': 'mt1_balance', type: 'plainText' },
      { 'Lifetime fees paid': 'lifetime_fees_paid', type: 'plainText' },
      { 'Total operations': 'total_ops', type: 'plainText' },
      {
        'Statistics table_key': 'statistics',
        type: 'html',
        link: `/objects/${parsedAccount?.statistics}`,
      },
    ];
    return buildCustomKVTableDto(parsedAccount, headerStatsM);
  };

  const infoRows = generateHeaderInfoRows();
  const statsRows = generateHeaderStatsRows();

  return (
    <PageWrapper>
      <StyledContainer>
        <BlockWrapper width="40%">
          {parsedAccount ? (
            <StyledIdenticon string={parsedAccount?.name} size={300} />
          ) : (
            <Loader />
          )}
        </BlockWrapper>
        <BlockWrapper>
          <Label>{t('Account Information')}</Label>
          <div style={{ width: '100%' }}>
            {parsedAccount && infoRows ? (
              <Table
                headers={['Key', 'Value']}
                rows={infoRows}
                lastcellaligned={false}
                cellHeight="10px"
              />
            ) : (
              <Loader />
            )}
          </div>
        </BlockWrapper>
        <BlockWrapper className="stat">
          <Label>{t('Account Statistics')}</Label>
          <div style={{ width: '100%' }}>
            {parsedAccount && statsRows ? (
              <Table
                headers={['Key', 'Value']}
                rows={statsRows}
                lastcellaligned={false}
                cellHeight="10px"
              />
            ) : (
              <Loader />
            )}
          </div>
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default General;
