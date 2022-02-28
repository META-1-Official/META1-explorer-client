import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

// import components
import {SearchCard} from '../../components/Card';

const PageWrapper = styled.div`
  display: flex;
`;

const StyledChartContainer = styled.div`
  padding-top: 87px;
  padding-left: 270px;
  padding-bottom: 38px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const Search = () => {
  return (
    <PageWrapper>
      <StyledChartContainer>
        <SearchCard
          title="Search Block"
          description="Search by block by inserting block number. No commas, no dots, just pure numbers."
          searchInputSample="194"
          searchInputLabel="Block number"
          searchInputPlaceholder="Enter Block number"
        />
        <SearchCard
          title="Search Account"
          description="Looking for an account? Start typing the first letters of it's name and let the auto complete feature help you find the exact account name string."
          searchInputSample="meta1"
          searchInputLabel="Account name or ID"
          searchInputPlaceholder="Enter account name or id number"
        />
        <SearchCard
          title="Search Object"
          description="In order to search for an object you need to insert an ID with the correct META1 object format. More info and list can be found HERE."
          searchInputSample="1.3.0"
          searchInputLabel="Object ID"
          searchInputPlaceholder="Enter account name or id number"
        />
        <SearchCard
          title="Search Asset"
          description="Looking for a SmartCoin or UIA? Start typing the first letters of it's name and let the auto complete feature help you find the exact asset name string."
          searchInputSample="USDT"
          searchInputLabel="Asset name or id"
          searchInputPlaceholder="Enter asset name or id"
        />
        <SearchCard
          title="Search Transaction Hash"
          description="If you have a transaction hash, please paste it here to get transaction information."
          searchInputSample="cb4a306cb75.....6bb37bbcd29"
          searchInputLabel="Transaction ID"
          searchInputPlaceholder="Enter tx hash"
        />
      </StyledChartContainer>
    </PageWrapper>
  );
};

export default Search;
