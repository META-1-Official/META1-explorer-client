// styled components
import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;
  flex-direction: column;
`;

export const StyledChartContainer = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
    align-items: center;
  }

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const LineChartsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 17px;

  @media only screen and (max-width: 1315px) {
    max-width: 600px;
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const FilledLineChartWrapper = styled.div`
  margin-left: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 408px;

  @media only screen and (max-width: 1020px) {
    margin-top: 30px;
  }

  @media ${(props) => props.theme.bkps.device.mobile} {
    max-width: unset;
    margin-left: 0;
  }
`;

export const StyledTableContainer = styled.div`
  padding-top: 38px;
  display: flex;
  flex-direction: column;
`;

export const StyledPaginationContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  display: flex;
  justify-content: flex-end;

  @media ${(props) => props.theme.bkps.device.mobile} {
    justify-content: center;
  }
`;
