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
import { ProductTable } from '../ProductTable';
// Ajoute une ligne vide ici avant de commencer le code**
  
export function ProductView() {
  
 
   // State to manage filter name and sorting option
   const [filterName, setFilterName] = useState<string>('');

  // Fonction pour gérer le changement du filtre de recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };
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
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Produits
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenModal}
        >
          Nouveau Article
        </Button>
      </Box>
      <Card>
      <input
        type="text"
        value={filterName}
        onChange={handleSearch}
        placeholder="Rechercher par libellé"
      />
      
      {/* Appel à ProductTable en passant filterName */}
      <ProductTable filterName={filterName} />
              {/* The rest of your table goes here */}
         {/* <ProductTableToolbar
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
              </Scrollbar> */}
      
              {/* <TablePagination
                component="div"
                page={table.page}
                count={_product.length}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                rowsPerPageOptions={[10, 25, 50]}
                onRowsPerPageChange={table.onChangeRowsPerPage}
              /> */}
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
