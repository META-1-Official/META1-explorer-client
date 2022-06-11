import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// import components
import { Table } from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';

// import utils
import { localizeNumber } from '../../../helpers/utility';

// import services
import accountsService from '../../../services/accounts.services';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
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

  @media only screen and (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const Votes = ({ accountFullData }) => {
  const [votesData, setVotesData] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (accountFullData) {
      (async () => {
        setLoading(true);
        const parsed = await accountsService.getVotesData(accountFullData);
        setVotesData(parsed);
        setLoading(false);
      })();
    }
  }, [accountFullData]);

  // vars
  const headers = ['Id', 'Type', 'Account', 'Total Votes']; // table headers
  const vote_rows = votesData
    ? votesData.map((vote) => {
        return {
          Id: [`<a href="/objects/${vote.id}">${vote.id}</a>`, 'html'],
          Type: [vote.type, 'plainText'],
          Account: [
            `<a href="/accounts/${vote.account}">${vote.account_name}</a>`,
            'html',
          ],
          'Total Votes': [localizeNumber(vote.votes_for), 'plainText'],
        };
      })
    : [];

  return (
    <PageWrapper>
      <StyledContainer>
        <BlockWrapper>
          <Label>{t('Supporting with my vote')}</Label>
          {loading && <Loader />}
          {!vote_rows.length && !loading && (
            <Typography align={'center'} color={'#FFFFFF'} marginTop={'1rem'}>
              {t('NO VOTES FOUND')}
            </Typography>
          )}
          {vote_rows.length && <Table headers={headers} rows={vote_rows} />}
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Votes;
