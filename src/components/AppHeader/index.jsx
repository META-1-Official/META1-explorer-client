import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styled from 'styled-components';

import {Divider} from '../Divider';

import logo from '../../assets/images/meta-logo.png';
import dayNightImg from '../../assets/images/day-night.png';
import helpImg from '../../assets/images/help.png';
import enImg from '../../assets/images/en.png';
import cnImg from '../../assets/images/cn.png';

const StyledSelect = styled(Select)`
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

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 1em;
  background-color: ${(props) => props.theme.palette.background.nearBlack};
  border: 1px solid ${(props) => props.theme.palette.border.darkGrey};
  justify-content: space-between;

  .navbar-item {
    display: flex;
    align-items: center;
    padding: 0 0.5em;
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;

    &.active {
      color: ${(props) => props.theme.palette.primary.main};
    }

    &:hover {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const Tabs = styled.div`
  display: flex;
`;

const Settings = styled.div`
  display: flex;
`;

const StyledLangSelect = styled(Select)`
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

const Img = styled.img`
  width: 90px;
  margin-right: 45px;

  &.lang, &.setting {
    width: 23px;
    margin-right: 10px;
  }
`;

const AppHeader = () => {
  const location = useLocation();
  const [language, setLanguage] = useState('en');
  const [menuItem, setMenuItem] = useState('governance');
  const [selected, setSelected] = useState(location.pathname);

  const handleClick = (route) => {
    setSelected(route);
  };

  const routeStatus = (route) => {
    return selected === route ? 'active' : '';
  };

  return (
    <NavBar>
      <Tabs>
        <Img alt="logo" src={logo} />
        <Link
          to="/"
          className={`navbar-item ${routeStatus('/')}`}
          onClick={() => handleClick('/')}
        >
          Dashboard
        </Link>
        <Link
          to="/search"
          className={`navbar-item ${routeStatus('/search')}`}
          onClick={() => handleClick('/search')}
        >
          Search
        </Link>
        <Link
          to="/txs"
          className={`navbar-item ${routeStatus('/txs')}`}
          onClick={() => handleClick('/txs')}
        >
          Transactions
        </Link>
        <Link
          to="/assets"
          className={`navbar-item ${routeStatus('/assets')}`}
          onClick={() => handleClick('/assets')}
        >
          Assets
        </Link>
        <Link
          to="/markets"
          className={`navbar-item ${routeStatus('/markets')}`}
          onClick={() => handleClick('/markets')}
        >
          Markets
        </Link>
        <Link
          to="/"
          className={`navbar-item ${routeStatus('/accounts')}`}
          onClick={() => handleClick('/accounts')}
        >
          Accounts
        </Link>
        <Link
          to="/fees"
          className={`navbar-item ${routeStatus('/fees')}`}
          onClick={() => handleClick('/fees')}
        >
          Fees
        </Link>
        <StyledSelect
          labelId="governance"
          id="governance"
          autoWidth
          value={menuItem}
          onChange={(event) => setMenuItem(event.target.value)}
        >
          <MenuItem value="governance">
            <Link
              to="/"
              className={`navbar-item ${routeStatus('/governance')}`}
              onClick={() => handleClick('/governance')}
            >
              Governance
            </Link>
          </MenuItem>
          <MenuItem value="committee">
            <Link
              to="/"
              className={`navbar-item ${routeStatus('/committee')}`}
              onClick={() => handleClick('/committee')}
            >
              Committee
            </Link>
          </MenuItem>
          <MenuItem value="witnesses">
            <Link
              to="/"
              className={`navbar-item ${routeStatus('/witnesses')}`}
              onClick={() => handleClick('/witnesses')}
            >
              Witnesses
            </Link>
          </MenuItem>
          <MenuItem value="workers">
            <Link
              to="/"
              className={`navbar-item ${routeStatus('/workers')}`}
              onClick={() => handleClick('/workers')}
            >
              Workers
            </Link>
          </MenuItem>
          <MenuItem value="voting">
            <Link
              to="/"
              className={`navbar-item ${routeStatus('/voting')}`}
              onClick={() => handleClick('/voting')}
            >
              Voting
            </Link>
          </MenuItem>
          <MenuItem value="proxies">
            <Link
              to="/"
              className={`navbar-item ${routeStatus('/proxies')}`}
              onClick={() => handleClick('/proxies')}
            >
              Proxies
            </Link>
          </MenuItem>
        </StyledSelect>
      </Tabs>
      <Settings>
        <StyledLangSelect
          labelId="language-select"
          id="language-select"
          autoWidth
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <MenuItem value="en">
            <Img alt="Flag" src={enImg} className="lang" />
          </MenuItem>
          <MenuItem value="cn">
            <Img alt="Flag" src={cnImg} className="lang" />
          </MenuItem>
        </StyledLangSelect>
        <Divider style={{height: '38px'}} />
        <div className="navbar-item">
          <Img alt="Help" src={helpImg} className="setting" />
          <span role="button">Get Help</span>
        </div>
        <Divider style={{height: '38px'}} />
        <IconButton className="navbar-item">
          <Img alt="Toggle Theme" src={dayNightImg} className="setting" />
        </IconButton>
      </Settings>
    </NavBar>
  );
};

export default AppHeader;
