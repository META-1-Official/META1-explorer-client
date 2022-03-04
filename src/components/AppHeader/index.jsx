import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import {Divider} from '../Divider';

import logo from '../../assets/images/meta-logo.png';
import dayNightImg from '../../assets/images/day-night.png';
import helpImg from '../../assets/images/help.png';
import flagImg from '../../assets/images/flag.png';

const AppHeader = () => {
  const location = useLocation();
  const [language, setLanguage] = useState('en');
  const [selected, setSelected] = useState(location.pathname);

  const handleClick = (route) => {
    setSelected(route);
  };

  const routeStatus = (route) => {
    return selected === route ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <img alt="logo" src={logo} className="img img-logo" />
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
        to="/"
        className={`navbar-item ${routeStatus('/markets')}`}
        onClick={() => handleClick('/markets')}
      >
        Markets
      </Link>
      <Link
        to="/accounts"
        className={`navbar-item ${routeStatus('/accounts')}`}
        onClick={() => handleClick('/accounts')}
      >
        Accounts
      </Link>
      <Link
        to="/"
        className={`navbar-item ${routeStatus('/fees')}`}
        onClick={() => handleClick('/fees')}
      >
        Fees
      </Link>
      <Link
        to="/"
        className={`navbar-item ${routeStatus('/governance')}`}
        onClick={() => handleClick('/governance')}
      >
        Governance
      </Link>
      <div className="navbar-item" style={{marginTop: '7px'}}>
        <Select
          labelId="language-select"
          id="language-select"
          autoWidth
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <MenuItem value="en">
            <img alt="Flag" src={flagImg} className="img img-21" />
          </MenuItem>
          <MenuItem value="cn">
            <img alt="Flag" src={flagImg} className="img img-21" />
          </MenuItem>
        </Select>
      </div>
      <Divider style={{height: '38px'}} />
      <div className="navbar-item">
        <img alt="Help" src={helpImg} className="img img-23" />
        <span role="button">Get Help</span>
      </div>
      <Divider style={{height: '38px'}} />
      <IconButton className="navbar-item">
        <img alt="Toggle Theme" src={dayNightImg} className="img img-21" />
      </IconButton>
    </nav>
  );
};

export default AppHeader;
