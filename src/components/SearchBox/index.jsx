import React from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import styled from 'styled-components';

import searchImg from '../../assets/images/search.png';

const Img = styled.img`
  height: 18px;
`;

export const SearchBox = ({placeholder, onSearch}) => {
  const [searchKey, setSearchKey] = React.useState('');  

  const onSearchKeyChange = (event) => {
    onSearch(event.target.value);
    setSearchKey(event.target.value);
  };

  const onClickSearchBtn = () => {
    onSearch(searchKey);
  };

  return (
    <TextField
      placeholder={placeholder}
      id="outlined-start-adornment"
      sx={{m: 1}}
      value={searchKey}
      onChange={onSearchKeyChange}
      InputProps={{
        endAdornment: (
          <IconButton onClick={onClickSearchBtn}>
            <Img alt="Search" src={searchImg} />
          </IconButton>
        ),
      }}
    />
  );
};
