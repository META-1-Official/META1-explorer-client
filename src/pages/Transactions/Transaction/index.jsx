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

const Transaction = () => {
  return (
    <PageWrapper>
      <StyledContainer>
        5ada6c470028b325d164b4855eea78427fe62b18
      </StyledContainer>
    </PageWrapper>
  );
};

export default Transaction;
