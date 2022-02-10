import {useState} from 'react';
import {Link} from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import {Divider} from '../Divider';

import logo from '../../assets/images/meta-logo.png';
import dayNightImg from '../../assets/images/day-night.png';
import helpImg from '../../assets/images/help.png';
import flagImg from '../../assets/images/flag.png';

export default function AppHeader() {
  const [language, setLanguage] = useState('en');

  return (
    <nav className="navbar">
      <img alt="logo" src={logo} className="img img-logo" />
      <Link to="/" className="navbar-item active">
        Dashboard
      </Link>
      <Link to="/" className="navbar-item">
        Search
      </Link>
      <Link to="/" className="navbar-item">
        Transactions
      </Link>
      <Link to="/" className="navbar-item">
        Assets
      </Link>
      <Link to="/" className="navbar-item">
        Markets
      </Link>
      <Link to="/" className="navbar-item">
        Accounts
      </Link>
      <Link to="/" className="navbar-item">
        Fees
      </Link>
      <Link to="/" className="navbar-item">
        Governance
      </Link>
      <div className="navbar-item">
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
}
