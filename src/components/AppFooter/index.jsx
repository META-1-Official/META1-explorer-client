import styled from 'styled-components';

const StyledFooter = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.background.nearBlack};
  border: 1px solid ${({ theme }) => theme.palette.border.darkGrey};
  box-sizing: border-box;

  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <span>META 1 &copy; {currentYear}</span>
    </StyledFooter>
  );
};

export default AppFooter;
