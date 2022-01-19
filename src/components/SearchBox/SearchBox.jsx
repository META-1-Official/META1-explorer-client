import React from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBox = ({placeholder, defaultValue, value, onChange}) => {
  return (
    <TextField
      placeholder={placeholder}
      id="outlined-start-adornment"
      sx={{m: 1, width: '32ch'}}
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};
