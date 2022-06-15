import styled from 'styled-components';
import { Select } from '@mui/material';

export const StyledSelect = styled(Select)`
  width: fit-content !important;
  margin-top: 2px;

  .MuiSelect-select {
    background-color: ${(props) => props.theme.palette.background.nearBlack};
    height: 24px !important;
    padding-left: 0px;
    padding-right: 0px;
    border: none;
  }

  .MuiSvgIcon-root {
    right: 15px !important;
  }
`;

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 1em;
  background-color: ${(props) => props.theme.palette.background.nearBlack};
  border: 1px solid ${(props) => props.theme.palette.border.darkGrey};
  justify-content: space-between;
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isOpen ? 'column' : 'row')};
`;

export const SettingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

export const Settings = styled.div`
  display: flex;
`;

export const StyledLangSelect = styled(Select)`
  width: fit-content !important;
  margin-top: 2px;

  .MuiSelect-select {
    background-color: ${(props) => props.theme.palette.background.nearBlack};
    height: 24px !important;
    padding-left: 0px;
    padding-right: 0px;
    border: none;
  }

  .MuiSvgIcon-root {
    right: 15px !important;
  }
`;

export const Img = styled.img`
  width: 90px;
  margin-right: 45px;

  &.lang,
  &.setting {
    width: 23px;
    margin-right: 10px;
  }
`;

export const MobileHeader = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  background: ${(props) => props.theme.palette.background.nearBlack};
  width: 100%;
  z-index: 10;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: flex-end;
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
