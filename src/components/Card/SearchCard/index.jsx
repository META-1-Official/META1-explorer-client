import { Autocomplete, Popper } from '@mui/material';
import PropTypes from 'prop-types';

import Loader from '../../Loader/Loader';
import { useTranslation } from 'react-i18next';
import {
  CardBody,
  CardDescriptionWrapper,
  CardHeader,
  CardWrapper,
  CustomPopper,
  Description,
  Html,
  HtmlWrapper,
  Label,
  LabelWrapper,
  LoaderWrapper,
  StyledButton,
  StyledTextField,
} from './SearchCard.styles';

const SearchCard = ({
  title,
  description,
  searchInputSample,
  searchInputLabel,
  searchInputPlaceholder,
  onClick,
  value,
  onChange,
  isLoading,
  options,
  withSelect,
}) => {
  const { t } = useTranslation();

  const PopperMy = (props) => {
    return <CustomPopper {...props} placement="bottom-end" />;
  };

  return (
    <CardWrapper>
      <CardHeader>{t(title)}</CardHeader>
      <CardBody>
        <CardDescriptionWrapper>
          <Description>{t(description)}</Description>
        </CardDescriptionWrapper>
        <div>
          <LabelWrapper>
            {isLoading && (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
            <HtmlWrapper>
              {t('Sample input')}:
              <Html dangerouslySetInnerHTML={{ __html: searchInputSample }} />
            </HtmlWrapper>
            <Label htmlFor={`${title}-search`}>{t(searchInputLabel)}</Label>
          </LabelWrapper>
          {withSelect ? (
            <Autocomplete
              id={title}
              options={options ? options : []}
              PopperComponent={PopperMy}
              onInputChange={onChange}
              inputValue={value}
              clearOnBlur={false}
              loading={isLoading}
              noOptionsText={t('No record found')}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  id={`${title}-search`}
                  variant="outlined"
                  placeholder={t(searchInputPlaceholder)}
                  sx={{ width: '100%' }}
                />
              )}
            />
          ) : (
            <StyledTextField
              id={title}
              variant="outlined"
              onChange={onChange}
              value={value}
              placeholder={t(searchInputPlaceholder)}
              sx={{ width: '100%' }}
            />
          )}
        </div>
        <StyledButton variant="contained" onClick={onClick}>
          {t('Search')}
        </StyledButton>
      </CardBody>
    </CardWrapper>
  );
};

SearchCard.propTypes = {
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

export { SearchCard };
