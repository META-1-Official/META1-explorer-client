import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';

// import components
import {Table} from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import {SearchBox} from '../../components/SearchBox';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

const {fetchCommittee} = actions;
const {getCommittee, isFetchingCommittee} = selectors;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  padding-left: 270px;
  padding-bottom: 38px;
  padding-right: 270px;
  display: flex;
  flex-direction: column;
`;

const StyledPaginationContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  padding-left: 270px;
  padding-bottom: 68px;
  padding-right: 270px;
  display: flex;
  justify-content: flex-end;
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

const Committee = () => {
  const [queryForActive, setQueryForActive] = useState('');
  const [queryForStandby, setQueryForStandby] = useState('');

  // dispatch
  const dispatch = useDispatch();

  const fetchCommitteeData = () => dispatch(fetchCommittee());

  // selectors
  const getCommitteeData = useSelector(getCommittee);
  const isFetchingCommitteeData = useSelector(isFetchingCommittee);

  // vars
  const filteredActiveCommitteeData = getCommitteeData.filter((data) =>
    data.operation.includes(queryForActive.toUpperCase()),
  );

  const filteredStandByCommitteeData = getCommitteeData.filter((data) =>
    data.operation.includes(queryForStandby.toUpperCase()),
  );

  const headers = ['ID', 'Operation', 'Basic', 'Premium', 'Amount']; // table headers
  const getRows = (type) => {
    let rowData = type === 'active'
    filteredActiveCommitteeData?.map((committee) => {
      return {
        Postion: ['', 'html'],
        ID: ['', 'html'],
        Account: ['', 'html'],
        URL: ['', 'html'],
        'Total Votes': ['', 'plainText'],
      };
    });
  };

  useEffect(() => {
    fetchCommitteeData(); // fetch data
  }, []);

  const onSearchForActiveCommittee = (query) => {
    setQueryForActive(query);
  };

  const onSearchForStandbyCommittee = (query) => {
    setQueryForStandby(query);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>
          Current active committee members
          <SearchBox
            placeholder="Search for Amount"
            onSearch={onSearchForActiveCommittee}
          />
        </Label>
        {!isFetchingCommitteeData && getRows('active') ? (
          <Table headers={headers} rows={getRows('active')}></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
      <StyledContainer>
        <Label>
          Standby committee members
          <SearchBox
            placeholder="Search for Amount"
            onSearch={onSearchForStandbyCommittee}
          />
        </Label>
        {!isFetchingCommitteeData && getRows('standby') ? (
          <Table headers={headers} rows={getRows('standby')}></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Committee;
