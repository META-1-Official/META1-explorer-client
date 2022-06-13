import React from 'react';

import { PropTypes } from 'prop-types';
import { ellipsis } from 'polished';

import MuiTable from '@mui/material/Table';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import styled from 'styled-components';
import { toast } from 'react-toastify';

import urlLinkImg from '../../assets/images/url-icon.png';
import { operationType } from '../../helpers/utility';
import { SearchBox } from '../SearchBox';
import { useTranslation } from 'react-i18next';

const TableContainerWrapper = styled.div`
  display: flex;

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding: 0 16px;
  }
`;

const StyledMuiTableContainer = styled(MuiTableContainer)`
  border-radius: 0.625em;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  .MuiTable-root {
    background: #0a0b0d;
    border: 1px solid #1c1f27;
    box-sizing: border-box;

    .MuiTableHead-root {
      background: #15171b;

      th.MuiTableCell-root {
        background: #15171b;
        &:last-child {
          text-align: ${(props) =>
            props.lastcellaligned === false ? 'left' : 'right'};
        }
        padding-top: ${(props) => props.cellHeight ?? '16px'};
        padding-bottom: ${(props) => props.cellHeight ?? '16px'};
      }
    }

    .MuiTableBody-root {
      .MuiTableRow-root {
        border: 1px solid rgba(194, 213, 225, 0.08);

        .MuiTableCell-root {
          color: white;
          border: none;
        }

        td.MuiTableCell-root {
          &:last-child {
            text-align: ${(props) =>
              props.lastcellaligned === false ? 'left' : 'right'};
          }
          padding-top: ${(props) => props.cellHeight ?? '16px'};
          padding-bottom: ${(props) => props.cellHeight ?? '16px'};

          div {
            ${ellipsis('350px')}
            margin-left: ${(props) =>
              props.lastcellaligned === false ? '0' : 'auto'};
            a {
              margin-left: 5px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
`;

const StyledMuiTableCell = styled(MuiTableCell)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
`;

const StyledSearchCell = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 5px 0 0 5px;
  font-size: 15px !important;
  background: #15171b;
`;

const StyledMuiTableHeaderCell = styled(MuiTableCell)`
  font-style: normal;
  font-weight: 600 !important;
  font-size: 15px !important;
  line-height: 21px;
  text-transform: uppercase;
  color: white !important;
  border-bottom: none !important;
`;

const Html = styled.div`
  color: ${(props) => props.theme.palette.text.third};
  font-weight: 300;
  align-items: center;
  display: flex;
  width: 100%;

  a {
    color: white;
    font-weight: 600;
  }

  img {
    width: 25px;
    margin-right: 14px;
  }
`;

const Text = styled.div`
  color: ${(props) =>
    props.type === 'colored'
      ? props.theme.palette.primary.main
      : props.theme.palette.text.third};
  font-weight: ${(props) => (props.type === 'colored' ? '500' : '400')};
`;

const Label = styled.div`
  background: ${(props) => `#${props.color}`};
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  width: fit-content;
  align-self: flex-end;
  display: flex !important;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  height: 24px;
  // opacity: 0.7;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

const LinkWrapper = styled.div`
  width: 32px;
  height: 32px;
  background: ${(props) => props.theme.palette.primary.main};
  display: flex !important;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 17px;
  height: 17px;
  margin-top: 7px;
`;

const TableCell = ({ cell }) => {
  const [content, contentType] = cell;
  const { t } = useTranslation();

  switch (contentType) {
    case 'html':
      return (
        <Html
          dangerouslySetInnerHTML={{
            __html: content.toString().replaceAll('/#', ''),
          }}
        />
      );
    case 'coloredText':
      return <Text type="colored">{content}</Text>;
    case 'label':
      return (
        <Label color={operationType(content)[1]}>
          {t(operationType(content)[0])}
        </Label>
      );
    case 'plainText':
      return <Text type="plain">{content}</Text>;
    case 'urlLink':
      return (
        <LinkWrapper onClick={() => handleUrlLinkClick(content)}>
          <Img src={urlLinkImg} />
        </LinkWrapper>
      );
    default:
      return <Text type="plain">{content}</Text>;
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
}) => {
  const { t } = useTranslation();
  return (
    <TableContainerWrapper>
      <StyledMuiTableContainer
        lastcellaligned={lastcellaligned}
        cellHeight={cellHeight}
      >
        {withSearch && (
          <StyledSearchCell>
            <div style={{ padding: '14px' }}>{t(headerText)}</div>
            <div>
              <SearchBox
                placeholder={searchText}
                onSearch={onSearch}
                fullWidth={searchFullWidth}
              />
            </div>
          </StyledSearchCell>
        )}
        <MuiTable aria-label="simple table" responsive>
          {!withSearch ? (
            <MuiTableHead>
              <MuiTableRow>
                {headers.map((header) => (
                  <StyledMuiTableHeaderCell
                    key={`header-${header}`}
                    align="left"
                  >
                    {t(header)}
                  </StyledMuiTableHeaderCell>
                ))}
              </MuiTableRow>
            </MuiTableHead>
          ) : null}

          <MuiTableBody>
            {withSearch ? (
              <MuiTableRow>
                {headers.map((header) => (
                  <StyledMuiTableHeaderCell
                    key={`header-${header}`}
                    align="left"
                  >
                    {t(header)}
                  </StyledMuiTableHeaderCell>
                ))}
              </MuiTableRow>
            ) : null}

            {rows.map((row, rawIndex) => (
              <MuiTableRow key={`raw-${rawIndex}`}>
                {headers.map((header) => (
                  <StyledMuiTableCell key={`row-${header}`} align="left">
                    <TableCell cell={row[header]} />
                  </StyledMuiTableCell>
                ))}
              </MuiTableRow>
            ))}
          </MuiTableBody>
        </MuiTable>
      </StyledMuiTableContainer>
    </TableContainerWrapper>
  );
};

Table.propTypes = {
  lastcellaligned: PropTypes.bool,
};
