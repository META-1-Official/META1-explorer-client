import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import { SearchBox } from '../../components/SearchBox';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import { localizeNumber } from '../../helpers/utility';

const { fetchWitnesses, fetchHeader } = actions;
const { getWitnesses, isFetchingWitnesses, getHeader, isFetchingHeader } =
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

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
    flex-direction: column;
  }
`;

const Witnesses = () => {
  const [queryForActive, setQueryForActive] = useState('');
  const [queryForStandby, setQueryForStandby] = useState('');

  // dispatch
  const dispatch = useDispatch();

  const fetchWitnessesData = () => dispatch(fetchWitnesses());
  const fetchHeaderData = () => dispatch(fetchHeader());

  // selectors
  const getWitnessesData = useSelector(getWitnesses);
  const getHeadData = useSelector(getHeader);
  const isFetchingWitnessesData = useSelector(isFetchingWitnesses);
  const isFetchingHead = useSelector(isFetchingHeader);

  // vars
  const witness_count = getHeadData?.witness_count;
  const filteredActiveWitnessesData =
    witness_count &&
    getWitnessesData
      ?.map((data, index) => {
        data['position'] = index + 1;
        return data;
      })
      .filter(
        (data, index) =>
          index < witness_count &&
          data.witness_account_name.includes(queryForActive.toLowerCase()), // first (witness_count)th = active
      );

  const filteredStandByWitnessesData =
    witness_count &&
    getWitnessesData?.filter(
      (data, index) =>
        witness_count <= index &&
        data.witness_account_name.includes(queryForStandby.toLowerCase()), // remain = standby
    );

  const headers = [
    'Position',
    'ID',
    'Account',
    'URL',
    'Total Votes',
    'Missed',
    'Last confirmed block',
  ]; // table headers
  const getRows = (type) => {
    let filteredData =
      type === 'active'
        ? filteredActiveWitnessesData
        : filteredStandByWitnessesData;

    let sortedData = filteredData?.sort((w1, w2) => {
      return parseInt(w1.id.split('.')[2]) - parseInt(w2.id.split('.')[2]);
    });

    return sortedData?.map((witness) => {
      return {
        Position: [witness.position, 'plainText'],
        ID: [`<a href="/objects/${witness.id}">${witness.id}</a>`, 'html'],
        Account: [
          `<a href="/objects/${witness.id}">${witness.witness_account_name}</a>`,
          'html',
        ],
        URL: [witness.url, 'urlLink'],
        'Total Votes': [localizeNumber(witness.total_votes), 'plainText'],
        Missed: [localizeNumber(witness.total_missed), 'plainText'],
        'Last confirmed block': [
          `<a href="/blocks/${
            witness.last_confirmed_block_num
          }">${localizeNumber(witness.last_confirmed_block_num)}</a>`,
          'html',
        ],
      };
    });
  };

  useEffect(() => {
    fetchHeaderData();
    fetchWitnessesData(); // fetch data
  }, []);

  useEffect(() => {
    console.log('AAA', getWitnessesData);
  }, []);

  const onSearchForActiveWitnesses = (query) => {
    setQueryForActive(query);
  };

  const onSearchForStandbyWitnesses = (query) => {
    setQueryForStandby(query);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>
          Active Witness
          <SearchBox
            placeholder="Search for Witnesses"
            onSearch={onSearchForActiveWitnesses}
          />
        </Label>
        {!isFetchingWitnessesData && !isFetchingHead && getRows('active') ? (
          <Table
            headers={headers}
            rows={getRows('active')}
            lastCellAligned={false}
          ></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
      <StyledContainer style={{ marginTop: '42px' }}>
        <Label>
          Standby Witness
          <SearchBox
            placeholder="Search for Witnesses"
            onSearch={onSearchForStandbyWitnesses}
          />
        </Label>
        {!isFetchingWitnessesData && !isFetchingHead && getRows('standby') ? (
          <Table
            headers={headers}
            rows={getRows('standby')}
            lastCellAligned={false}
          ></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default Witnesses;
