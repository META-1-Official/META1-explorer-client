import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

// import components
import {Table} from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';

// import utils
import { localizeNumber } from '../../../helpers/utility';

// import services
import accountsService from '../../../services/accounts.services';

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
`;

const BlockWrapper = styled.div`
  margin-top: 38px;
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;
`;

const Votes = ({accountFullData}) => {
  const [votesData, setVotesData] = useState('');

  useEffect(() => {
    if (accountFullData) {
      (async () => {
        const parsed = await accountsService.getVotesData(accountFullData);
        setVotesData(parsed);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Label>Supporting with my vote</Label>
          {vote_rows && vote_rows.length !== 0 ? (
            <Table headers={headers} rows={vote_rows}></Table>
          ) : (
            <Loader />
          )}
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Votes;
