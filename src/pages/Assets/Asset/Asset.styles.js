import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 40px;
  flex-direction: column;
`;

export const StyledContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
export const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  &.active_markets {
    @media only screen and (max-width: 600px) {
      margin-top: 30px;
    }
  }

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

export const Img = styled.img`
  width: 100%;
`;

export const Label = styled.div`
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

export const AssetInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #15171b;
  border: 1px solid #1c1f27;
  border-radius: 10px;
  padding: 20px;
  margin-top: 17px;
`;
