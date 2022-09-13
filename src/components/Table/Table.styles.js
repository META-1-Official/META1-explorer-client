import styled from 'styled-components';
import MuiTableContainer from '@mui/material/TableContainer';
import { ellipsis } from 'polished';
import MuiTableCell from '@mui/material/TableCell';

export const TableContainerWrapper = styled.div`
  display: flex;

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding: 0 16px;
  }
`;

export const StyledMuiTableContainer = styled(MuiTableContainer)`
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
        padding-top: ${(props) => props.cellHeight ?? '9px'};
        padding-bottom: ${(props) => props.cellHeight ?? '9px'};
      }
    }

    .MuiTableBody-root {
      .MuiTableRow-root {
        border: 1px solid rgba(194, 213, 225, 0.08);

        .MuiTableCell-root {
          color: white;
          border: none;
          vertical-align: bottom;
        }

        td.MuiTableCell-root {
          &:last-child {
            text-align: ${(props) =>
              props.lastcellaligned === false ? 'left' : 'right'};
          }
          padding-top: ${(props) => props.cellHeight ?? '9px'};
          padding-bottom: ${(props) => props.cellHeight ?? '9px'};

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

export const StyledMuiTableCell = styled(MuiTableCell)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
`;

export const StyledSearchCell = styled.div`
  display: flex;
  height: 60px;
  justify-content: ${(props) =>
    props.withSelect ? 'flex-end' : 'space-between'};
  align-items: center;
  color: white;
  border-radius: 5px 0 0 5px;
  font-size: 15px !important;
  background: #15171b;
`;

export const StyledMuiTableHeaderCell = styled(MuiTableCell)`
  font-style: normal;
  font-weight: 600 !important;
  font-size: 15px !important;
  line-height: 21px;
  text-transform: uppercase;
  color: white !important;
  border-bottom: none !important;
`;

export const Html = styled.div`
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

export const Text = styled.div`
  color: ${(props) =>
    props.type === 'colored'
      ? props.theme.palette.primary.main
      : props.theme.palette.text.third};
  font-weight: ${(props) => (props.type === 'colored' ? '500' : '400')};
`;

export const Label = styled.div`
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

export const LinkWrapper = styled.div`
  width: 32px;
  height: 32px;
  background: ${(props) => props.theme.palette.primary.main};
  display: flex !important;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
`;

export const Img = styled.img`
  width: 17px;
  height: 17px;
  margin-top: 7px;
`;
