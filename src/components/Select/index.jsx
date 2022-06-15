import styled from 'styled-components';
import {
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { useStyles, StyledMenuItem } from './Select.styles';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const CustomSelect = ({
  multiple,
  values,
  onChange,
  selectedValues,
  placeholder,
  searchCallback,
}) => {
  const classes = useStyles();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 600,
        width: 480,
      },
      className: classes.select,
    },
  };
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    searchCallback();
  };
  return (
    <>
      <Select
        className={classes.select}
        multiple={multiple}
        value={selectedValues}
        onChange={onChange}
        open={open}
        onOpen={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        displayEmpty
        onClose={close}
        renderValue={(selectedValues) => {
          if (selectedValues.length === 0) {
            return <>{t(placeholder)}</>;
          }
          return selectedValues.map((val) => t(val)).join(', ');
        }}
        MenuProps={MenuProps}
      >
        {placeholder && (
          <StyledMenuItem disabled value="">
            {t(placeholder)}
          </StyledMenuItem>
        )}
        {values?.map((value) => (
          <MenuItem key={value} value={value} className={classes.list}>
            <Checkbox checked={selectedValues.indexOf(value) > -1} />
            <ListItemText primary={t(value)} />
          </MenuItem>
        ))}
        {selectedValues.length > 0 && (
          <Button className={classes.button} onClick={close}>
            {t('Search')}
          </Button>
        )}
      </Select>
    </>
  );
};

export default CustomSelect;
