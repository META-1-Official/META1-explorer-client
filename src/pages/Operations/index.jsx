import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 38px;
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};  
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Operations = () => {
  return (
    <PageWrapper>
      <StyledContainer>
        <Label>Operations</Label>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Operations;
