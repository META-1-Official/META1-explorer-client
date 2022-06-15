import React from 'react';

import { PropTypes } from 'prop-types';
import * as styled from './Table.styles';

import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import { toast } from 'react-toastify';

import urlLinkImg from '../../assets/images/url-icon.png';
import { operationType } from '../../helpers/utility';
import { SearchBox } from '../SearchBox';
import { useTranslation } from 'react-i18next';
import CustomSelect from '../Select';
import CancelIcon from '@mui/icons-material/Cancel';

const TableCell = ({ cell }) => {
  const [content, contentType] = cell;
  const { t } = useTranslation();

  switch (contentType) {
    case 'html':
      return (
        <styled.Html
          dangerouslySetInnerHTML={{
            __html: content.toString().replaceAll('/#', ''),
          }}
        />
      );
    case 'coloredText':
      return <styled.Text type="colored">{content}</styled.Text>;
    case 'label':
      return (
        <styled.Label color={operationType(content)[1]}>
          {t(operationType(content)[0])}
        </styled.Label>
      );
    case 'date':
      return <styled.Text type="plain">{content}</styled.Text>;
    case 'plainText':
      return <styled.Text type="plain">{t(content)}</styled.Text>;
    case 'urlLink':
      return (
        <styled.LinkWrapper onClick={() => handleUrlLinkClick(content)}>
          <styled.Img src={urlLinkImg} />
        </styled.LinkWrapper>
      );
    default:
      return <styled.Text type="plain">{content}</styled.Text>;
  }
};

const handleUrlLinkClick = (url) => {
  if (url === '') {
    toast('No url to copy to clipboard');
  } else {
    toast(`'${url}' copied to clipboard!`);
    navigator.clipboard.writeText(url);
  }
};

export const Table = ({
  headers,
  rows,
  lastcellaligned,
  cellHeight,
  headerText,
  searchText,
  onSearch,
  searchFullWidth,
  withSearch,
  withSelect,
  selectMultiple,
  selectValues,
  selectSelectedValues,
  selectPlaceholder,
  searchCallback,
  clearFilters,
}) => {
  const { t } = useTranslation();
  return (
    <styled.TableContainerWrapper>
      <styled.StyledMuiTableContainer
        lastcellaligned={lastcellaligned}
        cellHeight={cellHeight}
      >
        {withSearch && (
          <styled.StyledSearchCell>
            <div style={{ padding: '14px' }}>{t(headerText)}</div>
            <div>
              <SearchBox
                placeholder={searchText}
                onSearch={onSearch}
                fullWidth={searchFullWidth}
              />
            </div>
          </styled.StyledSearchCell>
        )}
        {withSelect && (
          <styled.StyledSearchCell withSelect={withSelect}>
            {selectSelectedValues.length > 0 && (
              <CancelIcon
                color={'primary'}
                onClick={clearFilters}
                sx={{
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              />
            )}
            <CustomSelect
              values={selectValues}
              multiple={selectMultiple}
              onChange={onSearch}
              placeholder={selectPlaceholder}
              searchCallback={searchCallback}
              selectedValues={selectSelectedValues}
            />
          </styled.StyledSearchCell>
        )}
        <MuiTable aria-label="simple table" responsive>
          {!withSearch && !withSelect ? (
            <MuiTableHead>
              <MuiTableRow>
                {headers.map((header) => (
                  <styled.StyledMuiTableHeaderCell
                    key={`header-${header}`}
                    align="left"
                  >
                    {t(header)}
                  </styled.StyledMuiTableHeaderCell>
                ))}
              </MuiTableRow>
            </MuiTableHead>
          ) : null}

          <MuiTableBody>
            {withSearch || withSelect ? (
              <MuiTableRow>
                {headers.map((header) => (
                  <styled.StyledMuiTableHeaderCell
                    key={`header-${header}`}
                    align="left"
                  >
                    {t(header)}
                  </styled.StyledMuiTableHeaderCell>
                ))}
              </MuiTableRow>
            ) : null}

            {rows.map((row, rawIndex) => (
              <MuiTableRow key={`raw-${rawIndex}`}>
                {headers.map((header) => (
                  <styled.StyledMuiTableCell key={`row-${header}`} align="left">
                    <TableCell cell={row[header]} />
                  </styled.StyledMuiTableCell>
                ))}
              </MuiTableRow>
            ))}
          </MuiTableBody>
        </MuiTable>
      </styled.StyledMuiTableContainer>
    </styled.TableContainerWrapper>
  );
};

Table.propTypes = {
  lastcellaligned: PropTypes.bool,
};
