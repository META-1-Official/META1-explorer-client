import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import ReactTooltip from 'react-tooltip';

// import UI packs
import { Drawer, IconButton, Select, Divider, MenuItem } from '@mui/material';
import styled from 'styled-components';

import images from '../../helpers/images';
import icons from '../../helpers/icons';

import useWidth from '../../helpers/getWidth';

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
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isOpen ? 'column' : 'row')};
`;

const SettingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
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

  &.lang,
  &.setting {
    width: 23px;
    margin-right: 10px;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  background: black;
  width: 100%;
  z-index: 10;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: flex-end;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AppHeader = () => {
  const location = useLocation();
  const width = useWidth();
  const { t } = useTranslation();
  const [language, setLanguage] = useState('en');
  const [menuItem, setMenuItem] = useState('governance');
  const [selected, setSelected] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState();

  // handlers
  const handleClick = (route) => {
    setSelected(route);
    setIsOpen(false);
  };

  const routeStatus = (route) => {
    return selected === route ? 'active' : '';
  };

  const handleChange = (val) => {
    setLanguage(val);
    changeLanguage(val);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  // renderers
  const renderSettings = () => {
    return (
      <Settings>
        <StyledLangSelect
          labelId="language-select"
          id="language-select"
          autoWidth
          value={language}
          onChange={(event) => handleChange(event.target.value)}
        >
          <MenuItem value="en">
            <Img alt="Flag" src={images['lang-en']} className="lang" />
          </MenuItem>
          <MenuItem value="cn">
            <Img alt="Flag" src={images['lang-cn']} className="lang" />
          </MenuItem>
        </StyledLangSelect>
        <Divider style={{ height: '38px' }} />
        <IconButton className="navbar-item" data-tip data-for="help">
          <Img
            alt="Help"
            src={images['help-mark']}
            className="setting"
            style={{ width: '23px', height: '23px', alignSelf: 'center' }}
          />
        </IconButton>
        <Divider style={{ height: '38px' }} />
        {/* <IconButton className="navbar-item">
          <Img
            alt="Toggle Theme"
            src={images['theme-toggle']}
            className="setting"
          />
        </IconButton> */}
      </Settings>
    );
  };

  const renderDrawer = () => {
    return (
      <Drawer
        sx={{
          width: width > 420 ? 420 : width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: width > 420 ? 420 : width,
            background: '#0A0B0D',
          },
        }}
        variant="persistent"
        anchor="right"
        open={isOpen}
      >
        <Flex>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {icons['close']}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {renderTabs()}
        </Flex>
      </Drawer>
    );
  };

  const renderTabs = () => {
    return (
      <Tabs isOpen={width > 1140 ? false : true}>
        <Img
          alt="logo"
          src={images['logo']}
          style={{ display: width < 1140 ? 'none' : 'unset' }}
        />
        <Link
          to="/"
          className={`navbar-item ${routeStatus('/')}`}
          onClick={() => handleClick('/')}
        >
          {t('Dashboard')}
        </Link>
        <Link
          to="/search"
          className={`navbar-item ${routeStatus('/search')}`}
          onClick={() => handleClick('/search')}
        >
          {t('Search')}
        </Link>
        <Link
          to="/blocks"
          className={`navbar-item ${routeStatus('/blocks')}`}
          onClick={() => handleClick('/blocks')}
        >
          {t('Blocks')}
        </Link>
        <Link
          to="/txs"
          className={`navbar-item ${routeStatus('/txs')}`}
          onClick={() => handleClick('/txs')}
        >
          {t('Transactions')}
        </Link>
        <Link
          to="/assets"
          className={`navbar-item ${routeStatus('/assets')}`}
          onClick={() => handleClick('/assets')}
        >
          {t('Assets')}
        </Link>
        <Link
          to="/markets"
          className={`navbar-item ${routeStatus('/markets')}`}
          onClick={() => handleClick('/markets')}
        >
          {t('Markets')}
        </Link>
        <Link
          to="/accounts"
          className={`navbar-item ${routeStatus('/accounts')}`}
          onClick={() => handleClick('/accounts')}
        >
          {t('Accounts')}
        </Link>
        <Link
          to="/fees"
          className={`navbar-item ${routeStatus('/fees')}`}
          onClick={() => handleClick('/fees')}
        >
          {t('Fees')}
        </Link>
        <StyledSelect
          labelId="governance"
          id="governance"
          autoWidth
          value={menuItem}
          onChange={(event) => setMenuItem(event.target.value)}
        >
          <MenuItem value="governance">
            <div
              className={`sel-item ${routeStatus('/governance')}`}
              onClick={() => handleClick('/governance')}
            >
              {t('Governance')}
            </div>
          </MenuItem>
          <MenuItem value="committee">
            <Link
              to="/committee"
              className={`sel-item ${routeStatus('/committee')}`}
              onClick={() => handleClick('/committee')}
            >
              {t('Committee')}
            </Link>
          </MenuItem>
          <MenuItem value="witnesses">
            <Link
              to="/witnesses"
              className={`sel-item ${routeStatus('/witnesses')}`}
              onClick={() => handleClick('/witnesses')}
            >
              {t('Witnesses')}
            </Link>
          </MenuItem>
          {/* <MenuItem value="workers">
          <Link
            to="/"
            className={`sel-item ${routeStatus('/workers')}`}
            onClick={() => handleClick('/workers')}
          >
            Workers
          </Link>
        </MenuItem>
        <MenuItem value="voting">
          <Link
            to="/"
            className={`sel-item ${routeStatus('/voting')}`}
            onClick={() => handleClick('/voting')}
          >
            Voting
          </Link>
        </MenuItem>
        <MenuItem value="proxies">
          <Link
            to="/"
            className={`sel-item ${routeStatus('/proxies')}`}
            onClick={() => handleClick('/proxies')}
          >
            Proxies
          </Link>
        </MenuItem> */}
        </StyledSelect>
      </Tabs>
    );
  };

  const renderDesktopHeader = () => {
    return (
      <NavBar>
        {renderTabs()}
        {renderSettings()}
      </NavBar>
    );
  };

  const renderMobileHeader = () => {
    return (
      <>
        <MobileHeader>
          <Img
            alt="logo"
            src={images['logo']}
            style={{ width: '80px', height: '30px' }}
          />
          <SettingWrapper>
            {renderSettings()}
            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(isOpen && { display: 'none' }) }}
              style={{ color: '#FFC000' }}
            >
              {icons['menu']}
            </IconButton>
          </SettingWrapper>
        </MobileHeader>
        {renderDrawer()}
      </>
    );
  };

  const renderToolTip = () => (
    <ReactTooltip
      id="help"
      aria-haspopup="true"
      role="help"
      place="bottom"
      type="warning"
    >
      <p>Meta1 Explorer Client</p>
    </ReactTooltip>
  );

  return (
    <>
      {width > 1140 ? renderDesktopHeader() : renderMobileHeader()}
      {renderToolTip()}
    </>
  );
};

export default AppHeader;
