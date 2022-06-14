import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import { MenuItem } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  select: {
    marginRight: '1.2rem',
    '&::-webkit-scrollbar': {
      width: '10px !important',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.3) !important',
    },
  },
  list: {
    '&.MuiMenuItem-root.Mui-selected': {
      background: 'gray !important',
    },
  },
}));

export const StyledMenuItem = styled(MenuItem)`
  display: flex !important;
  justify-content: center !important;
  color: white !important;
  font-size: 1.5rem !important;
`;
