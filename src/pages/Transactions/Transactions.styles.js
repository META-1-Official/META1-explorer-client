import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 38px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding-top: 50px;
  }
`;

export const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;
