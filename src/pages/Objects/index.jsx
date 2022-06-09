import React from 'react';
import styled from 'styled-components';
import PageLabel from '../../components/PageLabel.jsx';

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

const Objects = () => {
  return (
    <PageWrapper>
      <StyledContainer>
        <PageLabel>OBJECTS</PageLabel>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Objects;
