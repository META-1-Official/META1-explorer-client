import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import cls from 'classnames';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import {Divider} from '../Divider';
import {NavItems} from './nav-items';

import logo from '../../assets/images/meta-logo.png';
import dayNightImg from '../../assets/images/day-night.png';
import helpImg from '../../assets/images/help.png';
import flagImg from '../../assets/images/flag.png';

export default function AppHeader() {
  const [language, setLanguage] = useState('en');

  const {pathname: activePath} = useLocation();

  return (
    <nav className="navbar">
      <img alt="logo" src={logo} className="img img-logo" />
      {NavItems.map((item) => (
        <Link
          to={item.path}
          key={item.path}
          className={cls('navbar-item', {active: activePath === item.path})}
        >
          {item.text}
        </Link>
      ))}
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
