import styled from 'styled-components';

const StyledFooter = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.background.nearBlack};
  border: 1px solid ${(props) => props.theme.palette.border.darkGrey};
  box-sizing: border-box;

  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${(props) => props.theme.palette.text.secondary}
  }
`;

const AppFooter = () => {
  return (
    <StyledFooter>
      <span>META 1 &#169; 2022</span>
    </StyledFooter>
  );
};

export default AppFooter;
