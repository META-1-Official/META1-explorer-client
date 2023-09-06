import styled from 'styled-components';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableCell from '@mui/material/TableCell';

export const TableContainerWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;

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
        background: black;
        &:last-child {
          text-align: ${(props) =>
            props.lastcellaligned === false ? 'left' : 'right'};
        }
        padding-top: ${(props) => props.cellHeight ?? '5px'};
        padding-bottom: ${(props) => props.cellHeight ?? '5px'};
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
          padding-top: ${(props) => props.cellHeight ?? '5px'};
          padding-bottom: ${(props) => props.cellHeight ?? '5px'};

          div {
            display: block;
            margin-left: ${(props) =>
              props.lastcellaligned === false ? '0' : 'auto'};
            a {
              margin-left: 5px;
              margin-right: 5px;
            }
          }
        }
      }
      .highlighted-row {
        background-color: rgba(233, 233, 233, 0.1);
      }
    }
  }
`;

export const Meta1Span = styled.span`
  color: #f1c40f;
`;

export const StyledMuiTableCell = styled(MuiTableCell)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
`;

export const FeesOperationNameMuiTableCell = styled(StyledMuiTableCell)`
  width: 40%;
  background: black;
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
  padding: 0px 5px;
  border-radius: 5px;
  width: fit-content;
  align-self: flex-end;
  display: flex !important;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  height: 24px;
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
