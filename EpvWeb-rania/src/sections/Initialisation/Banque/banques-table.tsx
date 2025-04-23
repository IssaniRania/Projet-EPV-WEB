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

function createData(code: number, Dimuinutif: string, Libelle: string, BIC: number, IBAN: number) {
  return { code, Dimuinutif, Libelle, BIC, IBAN };
}

const rows = [
  createData(0, '', '', 0, 0),
  createData(0, '', '', 0, 0),
  createData(0, '', '', 0, 0),
  createData(0, '', '', 0, 0),
  createData(0, '', '', 0, 0),
];

export default function BanquesTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Banques Table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Code</StyledTableCell>
            <StyledTableCell align="center">Dimuinutif</StyledTableCell>
            <StyledTableCell align="center">Libelle</StyledTableCell>
            <StyledTableCell align="center">BIC</StyledTableCell>

            <StyledTableCell align="center">IBAN</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.code}>
              <StyledTableCell align="center">{row.code}</StyledTableCell>
              <StyledTableCell align="center">{row.Dimuinutif}</StyledTableCell>
              <StyledTableCell align="center">{row.Libelle}</StyledTableCell>
              <StyledTableCell align="center">{row.BIC}</StyledTableCell>

              <StyledTableCell align="center">{row.IBAN}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
