
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {
   Dialog, DialogActions, DialogContent, DialogTitle, TextField,
   TableRow, TableCell
} from '@mui/material';

import { _product } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Icon } from '@iconify/react';


import { TableNoData } from '../table-no-data';
import { ProductTableRow } from '../product-table-row';
import { ProductTableHead } from '../product-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { ProductTableToolbar } from '../product-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


import type { ProductProps } from '../product-table-row';




// ----------------------------------------------------------------------

export function ProductView() {
  // Table hook to manage table data and state
  const table = useTable();

  // State to manage filter name and sorting option
  const [filterName, setFilterName] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // State to control the modal visibility (open/close)
  const [openModal, setOpenModal] = useState(false);

  // State to manage the new product's form data
  const [newProduct, setNewProduct] = useState({
    codeBarres: '',
    libelle: '',
    pa: '',
    pv: '',
    tva: '',
  });

  // Filter data based on the filterName (can be used to search through products)
  const dataFiltered: ProductProps[] = applyFilter({
    inputData: _product,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  // Check if there is no data after filtering and a filter has been applied
  const notFound = !dataFiltered.length && !!filterName;

  // Handle sorting functionality (when a column header is clicked)
  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  // Open modal when the "Nouveau Article" button is clicked
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Close the modal (e.g., when the user clicks cancel)
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle input changes in the modal form (updating the state for new product data)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (e.g., save the new product to the list or database)
  const handleSubmit = () => {
    console.log('New product data:', newProduct);
    // Close the modal after form submission
    setOpenModal(false);
  };

  return (
    <DashboardContent>
      {/* Header section with title and button */}
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
         Produits
        </Typography>
        
        {/* Button to open modal */}
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenModal} // Open modal when clicked
        >
          Article
        </Button>
      </Box>

      {/* Card component containing the table */}
      <Card>
        {/* The rest of your table goes here */}
        <ProductTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProductTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_product.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _product.map((product) => product.id)
                  )
                }
                headLabel={[
                  { id: 'CodeB', label: 'Code-Barres' },                 
                  { id: 'Libelle', label: 'Libelle' },
                  { id: 'pa', label: 'Prix D’achat',align:'center' },
                  { id: 'pv', label: 'Prix de Vente', align:'center'},
                  { id: 'tva', label: 'TVA', align:'center' },
                  { id: ''},
                  
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ProductTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _product.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_product.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[10, 25, 50]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
        {/* Modal Dialog for creating a new product */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Ajouter un Nouveau Produit</DialogTitle>
          <DialogContent>
            {/* Form inputs inside the modal */}
            <TextField
              label="Code-Barres"
              name="codeBarres"
              value={newProduct.codeBarres}
              onChange={handleInputChange} // Update the state when input changes
              fullWidth
              margin="normal"
            />
            <TextField
              label="Libelle"
              name="libelle"
              value={newProduct.libelle}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Prix D’achat"
              name="pa"
              value={newProduct.pa}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Prix de Vente"
              name="pv"
              value={newProduct.pv}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="TVA"
              name="tva"
              value={newProduct.tva}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            {/* Cancel button closes the modal */}
            <Button onClick={handleCloseModal} color="primary">
              Annuler
            </Button>
            {/* Submit button calls handleSubmit to save the new product */}
            <Button onClick={handleSubmit} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </DashboardContent>
  );
}

//-----

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}