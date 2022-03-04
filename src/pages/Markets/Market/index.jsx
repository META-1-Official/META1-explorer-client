import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
`;

const StyledContainer = styled.div`
  padding-top: 87px;
  padding-left: 270px;
  padding-bottom: 38px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  color: white;
`;

const Market = () => {
  return (
    <PageWrapper>
      <StyledContainer>USDT/BTC</StyledContainer>
    </PageWrapper>
  );
};

export default Market;
