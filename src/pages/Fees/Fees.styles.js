import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;
  flex-direction: column;
`;

export const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  display: flex;
  flex-direction: column;
`;

export const PageDescription = styled.div`
  color: white;
  font-size: 1rem;
  margin-bottom: 1rem;
`;
