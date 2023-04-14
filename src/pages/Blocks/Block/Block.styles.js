import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media ${(props) => props.theme.bkps.device.mobile} {
    margin-top: 50px;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  font-size: 20px;
  color: white;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
    flex-direction: column;
  }
`;

export const JsonInputWrapper = styled.div`
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  padding-bottom: 50px;

  #trd-outer-box {
    @media ${(props) => props.theme.bkps.device.mobile} {
      padding-left: 16px;
    }
    #trd-container {
      border: 1px solid rgba(194, 213, 225, 0.08);
      border-radius: 5px;
      #trd-body {
        background: transparent !important;
        font-size: 13px !important;
      }
    }
  }
`;
