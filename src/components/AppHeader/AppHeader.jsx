import {useState} from 'react';
import {Link} from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import logo from '../../assets/images/logo.png';

export default function AppHeader() {
  const [language, setLanguage] = useState('en');

  return (
    <nav className="navbar">
      <img alt="logo" src={logo} />
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
      <div className="navbar-dropdown">
        <Select
          labelId="language-select"
          id="language-select"
          autoWidth
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <MenuItem value="en">En</MenuItem>
          <MenuItem value="cn">Cn</MenuItem>
        </Select>
      </div>
      <div className="navbar-help">
        <HelpOutlineIcon sx={{color: '#ffc000'}} />
        <span>Get Help</span>
      </div>
      <IconButton className="navbar-item">
        <DarkModeOutlinedIcon sx={{color: '#ffc000'}} />
      </IconButton>
    </nav>
  );
}
