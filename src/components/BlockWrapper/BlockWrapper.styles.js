import styled from 'styled-components';

export const BlockWrapper = styled.div`
  margin-top: 38px;
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;

  &.stat {
    @media only screen and (max-width: 950px) {
      display: none;
    }
  }

  &.stat_d {
    display: none;
    @media only screen and (max-width: 950px) {
      display: flex;
    }
  }

  &.additional {
    @media only screen and (max-width: 980px) {
      display: none;
    }
  }

  &.additional_d {
    display: none;
    @media only screen and (max-width: 980px) {
      display: flex;
    }
  }

  @media only screen and (max-width: 950px) {
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
    align-items: center;
  }
`;
