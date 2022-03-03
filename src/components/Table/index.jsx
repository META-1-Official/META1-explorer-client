import React, {useState} from 'react';
import PropTypes from 'prop-types';

import MuiTable from '@mui/material/Table';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import styled from 'styled-components';

import {operationType} from '../../helpers/utility';

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
  color: ${props => props.theme.palette.text.third};
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

export const Table = ({headers, rows}) => {
  const renderCell = (cell) => {
    var content = cell[0];
    var contentType = cell[1];
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
      default:
        return <Text type="plain">{content}</Text>;
    }
  };

  return (
    <MuiTableContainer>
      <MuiTable sx={{minWidth: 650}} aria-label="simple table">
        <MuiTableHead>
          <MuiTableRow>
            {headers.map((header) => (
              <StyledMuiTableHeaderCell align="left">
                {header}
              </StyledMuiTableHeaderCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {rows.map((row, index) => (
            <MuiTableRow key={index}>
              {headers.map((header) => (
                <StyledMuiTableCell align="left">{renderCell(row[header])}</StyledMuiTableCell>))}
            </MuiTableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};

Table.propTypes = {};
