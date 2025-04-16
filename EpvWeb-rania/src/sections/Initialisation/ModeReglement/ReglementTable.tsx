import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';

type ProductTableProps = {
  filterName: string;
  reload: () => void;
};

type Product = {
  libelle: string;
  codeBarres: string;
  pa: string;
  pv: string;
  tva: string;
};

export function ReglementTable({ filterName, reload }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les produits depuis l'API
  useEffect(() => {
    axios
      .get('http://localhost:5088/api/produit')
      .then((response) => {
        console.log(response);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des produits');
        setLoading(false);
      });
  }, [reload]);  // Ajoute `reload` comme dépendance pour recharger les produits lorsqu'il est appelé.

  // Filtrer les produits en fonction de filterName
  const filteredProducts = products.filter((product) =>
    product.libelle.toLowerCase().includes(filterName ? filterName.toLowerCase() : '')
  );

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Libellé</TableCell>
          <TableCell>Code-Barres</TableCell>
          <TableCell>Prix dAchat</TableCell>
          <TableCell>Prix de Vente</TableCell>
          <TableCell>TVA</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.libelle}</TableCell>
              <TableCell>{product.codeBarres}</TableCell>
              <TableCell>{product.pa}</TableCell>
              <TableCell>{product.pv}</TableCell>
              <TableCell>{product.tva}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>Aucun produit trouvé</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
