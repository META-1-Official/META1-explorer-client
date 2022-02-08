import PropTypes from 'prop-types';

import MuiTable from '@mui/material/Table';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

const rows = [
  {
    name: 'Frozen yoghurt1',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    name: 'Frozen yoghurt2',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    name: 'Frozen yoghurt3',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    name: 'Frozen yoghurt4',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
];

export const Table = () => {
  return (
    <MuiTableContainer>
      <MuiTable sx={{minWidth: 650}} aria-label="simple table">
        <MuiTableHead>
          <MuiTableRow>
            <MuiTableCell>Dessert (100g serving)</MuiTableCell>
            <MuiTableCell align="left">Calories</MuiTableCell>
            <MuiTableCell align="left">Fat&nbsp;(g)</MuiTableCell>
            <MuiTableCell align="left">Carbs&nbsp;(g)</MuiTableCell>
            <MuiTableCell align="left">Protein&nbsp;(g)</MuiTableCell>
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {rows.map((row) => (
            <MuiTableRow
              key={row.name}
              // sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <MuiTableCell component="th" scope="row">
                {row.name}
              </MuiTableCell>
              <MuiTableCell align="left">{row.calories}</MuiTableCell>
              <MuiTableCell align="left">{row.fat}</MuiTableCell>
              <MuiTableCell align="left">{row.carbs}</MuiTableCell>
              <MuiTableCell align="left">{row.protein}</MuiTableCell>
            </MuiTableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};

Table.propTypes = {};
