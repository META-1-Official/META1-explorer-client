import styled from 'styled-components';
import { Checkbox, ListItemText, MenuItem, Select } from '@mui/material';
import { useStyles, StyledMenuItem } from './Select.styles';
import { useTranslation } from 'react-i18next';

const CustomSelect = ({
  multiple,
  values,
  onChange,
  selectedValues,
  placeholder,
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
  return (
    <>
      <Select
        className={classes.select}
        multiple={multiple}
        value={selectedValues}
        onChange={onChange}
        displayEmpty
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
      </Select>
    </>
  );
};

export default CustomSelect;
