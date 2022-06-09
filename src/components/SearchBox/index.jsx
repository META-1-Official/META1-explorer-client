import React from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import styled from 'styled-components';

import searchImg from '../../assets/images/search.png';
import { useTranslation } from 'react-i18next';

const Img = styled.img`
  height: 18px;
`;

const StyledSearch = styled(TextField)`
  & > div {
    width: ${(props) => (props.width ? props.width : '312px')} !important;
    font-size: 14px;
    padding-right: 0;
  }
`;

export const SearchBox = ({ placeholder, onSearch, fullWidth }) => {
  const [searchKey, setSearchKey] = React.useState('');
  const { t } = useTranslation();

  const width = fullWidth ? '350px' : undefined;

  const onSearchKeyChange = (event) => {
    onSearch(event.target.value);
    setSearchKey(event.target.value);
  };

  const onClickSearchBtn = () => {
    onSearch(searchKey);
  };

  return (
    <StyledSearch
      placeholder={t(placeholder)}
      id="outlined-start-adornment"
      sx={{ m: 1 }}
      value={searchKey}
      width={width}
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
