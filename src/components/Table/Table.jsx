import MuiTable from '@mui/material/Table';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

const getTableCellAlignProperty = (index, length) =>
  index === length - 1 ? 'right' : 'left';

export const Table = ({columns, rows}) => {
  return (
    <MuiTableContainer>
      <MuiTable sx={{minWidth: 650}} aria-label="simple table">
        <MuiTableHead>
          <MuiTableRow>
            {columns.map((column, index) => (
              <MuiTableCell
                key={column.key}
                align={getTableCellAlignProperty(index, columns.length)}
              >
                {column.label}
              </MuiTableCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {rows.map((row, rowIdex) => (
            <MuiTableRow
              key={`row-${rowIdex}`}
              // sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              {columns.map(({key}, columnIndex) => (
                <MuiTableCell
                  key={`cell-${columnIndex}-${key}`}
                  align={getTableCellAlignProperty(columnIndex, columns.length)}
                >
                  {row[key]}
                </MuiTableCell>
              ))}
            </MuiTableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};
