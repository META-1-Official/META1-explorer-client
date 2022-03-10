import React from 'react';

import { PropTypes } from 'prop-types';

import MuiTable from '@mui/material/Table';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import styled from 'styled-components';
import {toast} from 'react-toastify';

import urlLinkImg from '../../assets/images/url-icon.png';
import {operationType} from '../../helpers/utility';

const StyledMuiTableContainer = styled(MuiTableContainer)`
  border-radius: 0.625em;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  max-height: 700px;

  .MuiTable-root {
    background: #0a0b0d;
    border: 1px solid #1c1f27;
    box-sizing: border-box;

    .MuiTableHead-root {
      background: #15171b;

      th.MuiTableCell-root {
        &:last-child {
          text-align: ${props => props.lastcellaligned === false ? 'left' : 'right'};
        }
        padding-top: ${props => props.cellHeight ?? '16px'};
        padding-bottom: ${props => props.cellHeight ?? '16px'};
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
            text-align: ${props => props.lastcellaligned === false ? 'left' : 'right'};
          }
          padding-top: ${props => props.cellHeight ?? '16px'};
          padding-bottom: ${props => props.cellHeight ?? '16px'};
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

const StyledMuiTableHeaderCell = styled(MuiTableCell)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
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
  text-align: center;
  width: fit-content;
  align-self: right;
  opacity: 0.7;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

const LinkWrapper = styled.div`
  width: 32px;
  height: 32px;
  background: ${(props) => props.theme.palette.primary.main};
  display: flex;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 17px;
  height: 17px;
  margin-top: 7px;
`;

const TableCell = ({cell}) => {
  const [content, contentType] = cell;

  switch (contentType) {
    case 'html':
      return <Html dangerouslySetInnerHTML={{__html: content}} />;
    case 'coloredText':
      return <Text type="colored">{content}</Text>;
    case 'label':
      return (
        <Label color={operationType(content)[1]}>
          {operationType(content)[0]}
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

export const Table = ({headers, rows, lastcellaligned, cellHeight}) => {
  return (
    <StyledMuiTableContainer lastcellaligned={lastcellaligned} cellHeight={cellHeight}>
      <MuiTable aria-label="simple table">
        <MuiTableHead>
          <MuiTableRow>
            {headers.map((header) => (
              <StyledMuiTableHeaderCell key={`header-${header}`} align="left">
                {header}
              </StyledMuiTableHeaderCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
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
  );
};

Table.propTypes = {
  lastcellaligned: PropTypes.bool
};
