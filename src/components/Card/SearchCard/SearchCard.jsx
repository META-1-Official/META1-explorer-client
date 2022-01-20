import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {Link} from '../../Link';

export const SearchCard = ({
  title,
  description,
  searchInputSample,
  searchInputLabel,
  searchInputPlaceholder,
}) => {
  return (
    <div className="card card-search">
      <div className="card-header">
        <span className="card-title">{title}</span>
      </div>
      <div className="card-body">
        <div className="card-description">
          <span>{description}</span>
          <br />
          <span>
            Sample Input: <Link text={searchInputSample} />{' '}
          </span>
        </div>
        <div>
          <label htmlFor={`${title}-search`}>{searchInputLabel}</label>
          <TextField
            id={`${title}-search`}
            variant="outlined"
            placeholder={searchInputPlaceholder}
            sx={{width: '100%'}}
          />
        </div>
        <Button
          variant="contained"
          sx={{
            color: '#550101',
            backgroundColor: '#ffc000',
            width: '160px',
            height: '52px',
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
