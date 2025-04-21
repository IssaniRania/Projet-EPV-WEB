import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#A1A5B7',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  code: number,
  taux: number,
  majoration: number,
 
) {
  return { code, taux, majoration };
}

const rows = [
  createData(0, 0, 0 ),
  createData(0, 0, 0),
  createData(0, 0, 0),
  createData(0, 0, 0),
  createData(0, 0, 0,),
];

export default function TvaTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500, marginTop:4 }} aria-label="TVA table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Code</StyledTableCell>
            <StyledTableCell align="center">Taux TVA</StyledTableCell>
            <StyledTableCell align="center">Majoration TVA</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.code}>
              <StyledTableCell   align="center">
                {row.code}
              </StyledTableCell>
              <StyledTableCell align="center">{row.taux}</StyledTableCell>
              <StyledTableCell align="center">{row.majoration}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}