import React from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import searchImg from '../../assets/images/search.png';

export const SearchBox = ({placeholder, onSearch}) => {
  const [searchKey, setSearchKey] = React.useState('');

  const onSearchKeyChange = (event) => {
    setSearchKey(event.target.value);
  };

  const search = () => {
    if (!searchKey) {
      return;
    }

    onSearch(searchKey);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  const onClickSearchBtn = () => {
    search();
  };

  return (
    <TextField
      placeholder={placeholder}
      id="outlined-start-adornment"
      sx={{m: 1, width: '32ch'}}
      value={searchKey}
      onChange={onSearchKeyChange}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <IconButton onClick={onClickSearchBtn}>
            <img alt="Search" src={searchImg} className="img img-18" />
          </IconButton>
        ),
      }}
    />
  );
};
