import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import ReactTooltip from 'react-tooltip';
import * as styled from './AppHeader.styles';

// import UI packs
import { Drawer, IconButton, Divider, MenuItem } from '@mui/material';

import images from '../../helpers/images';
import icons from '../../helpers/icons';

import useWidth from '../../helpers/getWidth';

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

  useEffect(() => {
    if (localStorage.lang) {
      const val = localStorage.getItem('lang');
      setLanguage(val);
      changeLanguage(val);
    }
  }, [localStorage]);

  const handleChange = (val) => {
    setLanguage(val);
    localStorage.setItem('lang', val);
    window.location.reload();
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
      <styled.Settings>
        <styled.StyledLangSelect
          labelId="language-select"
          id="language-select"
          autoWidth
          value={language}
          onChange={(event) => handleChange(event.target.value)}
        >
          <MenuItem value="en">
            <styled.Img alt="Flag" src={images['lang-en']} className="lang" />
          </MenuItem>
          <MenuItem value="cn">
            <styled.Img alt="Flag" src={images['lang-cn']} className="lang" />
          </MenuItem>
          <MenuItem value="es">
            <styled.Img alt="Flag" src={images['lang-es']} className="lang" />
          </MenuItem>
        </styled.StyledLangSelect>
        <Divider style={{ height: '38px' }} />
        <IconButton className="navbar-item" data-tip data-for="help">
          <styled.Img
            alt="Help"
            src={images['help-mark']}
            className="setting"
            style={{ width: '23px', height: '23px', alignSelf: 'center' }}
            onClick={() =>
              window.open('https://support.meta1coin.vision', '_blank')
            }
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
      </styled.Settings>
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
        <styled.Flex>
          <styled.DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {icons['close']}
            </IconButton>
          </styled.DrawerHeader>
          <Divider />
          {renderTabs()}
        </styled.Flex>
      </Drawer>
    );
  };

  const renderTabs = () => {
    return (
      <styled.Tabs isOpen={width > 1140 ? false : true}>
        <styled.Img
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
        {/*<Link*/}
        {/*  to="/markets"*/}
        {/*  className={`navbar-item ${routeStatus('/markets')}`}*/}
        {/*  onClick={() => handleClick('/markets')}*/}
        {/*>*/}
        {/*  {t('Markets')}*/}
        {/*</Link>*/}
        <Link
          to="/accounts"
          className={`navbar-item ${routeStatus('/accounts')}`}
          onClick={() => handleClick('/accounts')}
        >
          {t('Wallets')}
        </Link>
        {/*<Link*/}
        {/*  to="/fees"*/}
        {/*  className={`navbar-item ${routeStatus('/fees')}`}*/}
        {/*  onClick={() => handleClick('/fees')}*/}
        {/*>*/}
        {/*  {t('Fees')}*/}
        {/*</Link>*/}
        {/*<styled.StyledSelect*/}
        {/*  labelId="governance"*/}
        {/*  id="governance"*/}
        {/*  autoWidth*/}
        {/*  value={menuItem}*/}
        {/*  displayEmpty*/}
        {/*  renderValue={(selected) => {*/}
        {/*    return <div className={`sel-item`}>Governance</div>;*/}
        {/*  }}*/}
        {/*  onChange={(event) => setMenuItem(event.target.value)}*/}
        {/*>*/}
        {/*  <MenuItem value="committee">*/}
        {/*    <Link*/}
        {/*      to="/committee"*/}
        {/*      className={`sel-item ${routeStatus('/committee')}`}*/}
        {/*      onClick={() => handleClick('/committee')}*/}
        {/*    >*/}
        {/*      {t('Committee')}*/}
        {/*    </Link>*/}
        {/*  </MenuItem>*/}
        {/*  <MenuItem value="witnesses">*/}
        {/*    <Link*/}
        {/*      to="/witnesses"*/}
        {/*      className={`sel-item ${routeStatus('/witnesses')}`}*/}
        {/*      onClick={() => handleClick('/witnesses')}*/}
        {/*    >*/}
        {/*      {t('Witnesses')}*/}
        {/*    </Link>*/}
        {/*  </MenuItem>*/}
        {/*  /!* <MenuItem value="workers">*/}
        {/*  <Link*/}
        {/*    to="/"*/}
        {/*    className={`sel-item ${routeStatus('/workers')}`}*/}
        {/*    onClick={() => handleClick('/workers')}*/}
        {/*  >*/}
        {/*    Workers*/}
        {/*  </Link>*/}
        {/*</MenuItem>*/}
        {/*<MenuItem value="voting">*/}
        {/*  <Link*/}
        {/*    to="/"*/}
        {/*    className={`sel-item ${routeStatus('/voting')}`}*/}
        {/*    onClick={() => handleClick('/voting')}*/}
        {/*  >*/}
        {/*    Voting*/}
        {/*  </Link>*/}
        {/*</MenuItem>*/}
        {/*<MenuItem value="proxies">*/}
        {/*  <Link*/}
        {/*    to="/"*/}
        {/*    className={`sel-item ${routeStatus('/proxies')}`}*/}
        {/*    onClick={() => handleClick('/proxies')}*/}
        {/*  >*/}
        {/*    Proxies*/}
        {/*  </Link>*/}
        {/*</MenuItem> *!/*/}
        {/*</styled.StyledSelect>*/}
      </styled.Tabs>
    );
  };

  const renderDesktopHeader = () => {
    return (
      <styled.NavBar>
        {renderTabs()}
        {renderSettings()}
      </styled.NavBar>
    );
  };

  const renderMobileHeader = () => {
    return (
      <>
        <styled.MobileHeader>
          <styled.Img
            alt="logo"
            src={images['logo']}
            style={{ width: '80px', height: '30px' }}
          />
          <styled.SettingWrapper>
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
          </styled.SettingWrapper>
        </styled.MobileHeader>
        {renderDrawer()}
      </>
    );
  };

  return <>{width > 1140 ? renderDesktopHeader() : renderMobileHeader()}</>;
};

export default AppHeader;
