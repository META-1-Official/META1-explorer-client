import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';
import { buildCustomKVTableDto } from '../../../helpers/utility';
import accountsService from '../../../services/accounts.services';
import Identicon from 'react-identicons';

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

const BlockWrapper = styled.div`
  margin-top: 38px;
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;

  &.stat {
    @media only screen and (max-width: 950px) {
      display: none;
    }
  }

  &.stat_d {
    display: none;
    @media only screen and (max-width: 950px) {
      display: flex;
    }
  }

  @media only screen and (max-width: 950px) {
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
    align-items: center;
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
  useEffect(() => {
    if (accountFullData) {
      (async () => {
        const parsed = await accountsService.getAccountFullData(
          accountFullData,
        );
        setParsedAccount(parsed);
      })();
    }
  }, []);

  // vars
  const headerInfoM = [
    { ID: 'id', type: 'html', link: `/accounts/${parsedAccount?.id}/` },
    { Name: 'name', type: 'plainText' },
    {
      Referer: 'referer',
      type: 'html',
      link: `/accounts/${parsedAccount?.referer}/`,
    },
    {
      Registrar: 'registrar',
      type: 'html',
      link: `/accounts/${parsedAccount?.registrar}/`,
    },
    {
      'Voting as': 'voting_account_name',
      type: 'html',
      link: `/accounts/${parsedAccount?.voting_account_name}`,
    },
  ];

  const headerStatsM = [
    { 'META1 Balance': 'bts_balance', type: 'plainText' },
    { 'Lifetime fees paid': 'lifetime_fees_paid', type: 'plainText' },
    {
      'Total operations': 'total_ops',
      type: 'plainText',
    },
    {
      Statistics: 'statistics',
      type: 'html',
      link: `/objects/${parsedAccount?.statistics}`,
    },
  ];
  const statsRows = buildCustomKVTableDto(parsedAccount, headerStatsM);
  const infoRows = buildCustomKVTableDto(parsedAccount, headerInfoM);

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
          <Label>Account Information</Label>
          <div style={{ width: '100%' }}>
            {parsedAccount && infoRows ? (
              <Table
                headers={['Key', 'Value']}
                rows={infoRows}
                lastcellaligned={false}
                cellHeight="10px"
              ></Table>
            ) : (
              <Loader />
            )}
          </div>
        </BlockWrapper>
        <BlockWrapper className="stat">
          <Label>Account statistics</Label>
          <div style={{ width: '100%' }}>
            {parsedAccount && statsRows ? (
              <Table
                headers={['Key', 'Value']}
                rows={statsRows}
                lastcellaligned={false}
                cellHeight="10px"
              ></Table>
            ) : (
              <Loader />
            )}
          </div>
        </BlockWrapper>
      </StyledContainer>
      <StyledContainer>
        <BlockWrapper className="stat_d">
          <Label>Account statistics</Label>
          <div style={{ width: '100%' }}>
            {parsedAccount && statsRows ? (
              <Table
                headers={['Key', 'Value']}
                rows={statsRows}
                lastcellaligned={false}
                cellHeight="10px"
              ></Table>
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
