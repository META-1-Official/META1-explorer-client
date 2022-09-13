import React from 'react';
import { StyledPaginationSelect } from './PaginationSelect.styles';
import { MenuItem } from '@mui/material';

const PaginationSelect = ({ value, onChange }) => {
  return (
    <StyledPaginationSelect select value={value} onChange={onChange} autoWidth>
      <MenuItem sx={{ color: 'white' }} value={10}>
        10
      </MenuItem>
      <MenuItem sx={{ color: 'white' }} value={20}>
        20
      </MenuItem>
      <MenuItem sx={{ color: 'white' }} value={30}>
        30
      </MenuItem>
      <MenuItem sx={{ color: 'white' }} value={50}>
        50
      </MenuItem>
    </StyledPaginationSelect>
  );
};

export default PaginationSelect;
