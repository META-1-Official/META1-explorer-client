import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

// import components
import {Table} from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import {SearchBox} from '../../components/SearchBox';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import {localizeNumber} from '../../helpers/utility';

const {fetchCommittee, fetchHeader} = actions;
const {getCommittee, isFetchingCommittee, getHeader, isFetchingHeader} =
  selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  const fetchHeaderData = () => dispatch(fetchHeader());

  // selectors
  const getCommitteeData = useSelector(getCommittee);
  const getHeadData = useSelector(getHeader);
  const isFetchingCommitteeData = useSelector(isFetchingCommittee);
  const isFetchingHead = useSelector(isFetchingHeader);

  // vars
  const committee_count = getHeadData?.committee_count;
  const filteredActiveCommitteeData =
    committee_count &&
    getCommitteeData
      ?.map((data, index) => {
        data[0]['position'] = index + 1;
        return data;
      })
      .filter(
        (data, index) =>
          index < committee_count &&
          data[0].committee_member_account_name.includes(
            queryForActive.toLowerCase(),
          ), // first (committee_count)th = active
      );

  const filteredStandByCommitteeData =
    committee_count &&
    getCommitteeData?.filter(
      (data, index) =>
        committee_count <= index &&
        data[0].committee_member_account_name.includes(
          queryForStandby.toLowerCase(),
        ), // remain = standby
    );

  const headers = ['Poistion', 'ID', 'Account', 'URL', 'Total Votes']; // table headers
  const getRows = (type) => {
    let filteredData =
      type === 'active'
        ? filteredActiveCommitteeData
        : filteredStandByCommitteeData;

    let sortedData = filteredData?.sort((c1, c2) => {
      return (
        parseInt(c1[0].id.split('.')[2]) - parseInt(c2[0].id.split('.')[2])
      );
    });

    return sortedData?.map((committee) => {
      return {
        Poistion: [committee[0].position, 'plainText'],
        ID: [
          `<a href="/objects/${committee[0].id}">${committee[0].id}</a>`,
          'html',
        ],
        Account: [
          `<a href="/objects/${committee[0].committee_member_account_name}">${committee[0].committee_member_account_name}</a>`,
          'html',
        ],
        URL: [committee[0].url, 'urlLink'],
        'Total Votes': [localizeNumber(committee[0].total_votes), 'plainText'],
      };
    });
  };

  useEffect(() => {
    fetchHeaderData();
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
        {!isFetchingCommitteeData && !isFetchingHead && getRows('active') ? (
          <Table headers={headers} rows={getRows('active')}></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
      <StyledContainer style={{marginTop: '42px'}}>
        <Label>
          Standby committee members
          <SearchBox
            placeholder="Search for Amount"
            onSearch={onSearchForStandbyCommittee}
          />
        </Label>
        {!isFetchingCommitteeData && !isFetchingHead && getRows('standby') ? (
          <Table headers={headers} rows={getRows('standby')}></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Committee;
