import Button from '@mui/material/Button';
import {Autocomplete, TextField} from '@mui/material';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loader from '../../Loader/Loader';

const CardWrapper = styled.div`
  width: 410px;
  height: 430px;
  border: 1px solid ${(props) => props.theme.palette.border.darkGrey};
  border-radius: 0.625em;
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.background.cardBg};
  padding: 0.5em 1.5em;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${(props) => props.theme.palette.border.dividerBottom};
  font-weight: 600;
  font-size: 20px;
  line-height: 2.5em;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const CardBody = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em 0px;
`;

const CardDescriptionWrapper = styled.div`
  margin-top: 5px;
`;

const Description = styled.div`
  font-weight: 300;
  font-size: 15px;
  color: ${(props) => props.theme.palette.text.third};
  max-width: 340px;
`;

const HtmlWrapper = styled.div`
  font-weight: 300;
  font-size: 15px;
  color: ${(props) => props.theme.palette.text.third};
  display: flex;
`;

const Html = styled.div`
  margin-left: 5px;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 400;

  a {
    color: ${(props) => props.theme.palette.primary.main};
    font-weight: 400;
  }
`;

const LabelWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const Label = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const LoaderWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: -32px;
`;


const StyledTextField = styled(TextField)`  
  .MuiInputBase-root {
    height: 51px !important;
  }
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 16px;
  width: 160px;
  height: 52px;
  border-radius: 6px;
  color: ${(props) => props.theme.palette.text.srchBtnText};
  background: ${(props) => props.theme.palette.primary.main};
`;

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
}) => {
  return (
    <CardWrapper>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <CardDescriptionWrapper>
          <Description>{description}</Description>
          <br />
          <HtmlWrapper>
            Sample Input:
            <Html dangerouslySetInnerHTML={{__html: searchInputSample}} />
          </HtmlWrapper>
        </CardDescriptionWrapper>
        <div>
          <LabelWrapper>
            {isLoading && (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
            <Label htmlFor={`${title}-search`}>{searchInputLabel}</Label>
          </LabelWrapper>
          <Autocomplete
            id={title}
            options={options ? options : []}
            sx={{width: 300}}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                id={`${title}-search`}
                variant="outlined"
                placeholder={searchInputPlaceholder}
                sx={{width: '100%'}}
                onChange={onChange}
                value={value}
                className="search-card"
              />
            )}
          />
        </div>
        <StyledButton variant="contained">Search</StyledButton>
      </CardBody>
    </CardWrapper>
  );
};

SearchCard.propTypes = {
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

export {SearchCard};
