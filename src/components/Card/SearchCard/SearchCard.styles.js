import styled from 'styled-components';
import { Popper, TextField } from '@mui/material';
import Button from '@mui/material/Button';

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 410px;
  height: 420px;
  border: 1px solid ${(props) => props.theme.palette.border.darkGrey};
  border-radius: 0.625em;
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.background.cardBg};
  padding: 0.5em 1.5em;
  display: flex;
  flex-direction: column;
`;

export const CardHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${(props) => props.theme.palette.border.dividerBottom};
  font-weight: 600;
  font-size: 20px;
  line-height: 2.5em;
  color: ${(props) => props.theme.palette.text.secondary};
`;

export const CardBody = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em 0px;
`;

export const CardDescriptionWrapper = styled.div`
  margin-top: 5px;
  min-height: 120px;
`;

export const Description = styled.div`
  font-weight: 300;
  font-size: 15px;
  color: ${(props) => props.theme.palette.text.third};
  max-width: 340px;
`;

export const HtmlWrapper = styled.div`
  font-weight: 300;
  font-size: 15px;
  color: ${(props) => props.theme.palette.text.third};
  display: flex;
`;

export const Html = styled.div`
  margin-left: 5px;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 400;

  a {
    color: ${(props) => props.theme.palette.primary.main};
    font-weight: 400;
  }
`;

export const LabelWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

export const Label = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${(props) => props.theme.palette.text.secondary};
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: -32px;
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    height: 51px !important;
  }
`;

export const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 16px;
  width: 160px;
  height: 52px;
  border-radius: 6px;
  color: ${(props) => props.theme.palette.text.srchBtnText};
  background: ${(props) => props.theme.palette.primary.main};
`;

export const CustomPopper = styled(Popper)`
  width: fit-content !important;
  min-width: 313px !important;
  @media screen and (max-width: 768px) {
    max-width: 90vw;
    .MuiAutocomplete-option {
      display: block !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
  }
`;
