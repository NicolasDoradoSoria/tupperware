import React, { useEffect, useContext, useState } from "react";

import Box from "@material-ui/core/Box";

import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";

import SnackbarOpen from "../snackbar/SnackBar";

import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import MaterialTable from "material-table"
import { PatchedPagination } from './TablePagination'
import AddProduct from "../addProduct/AddProduct";
import ReusableDialog from "../reusableDialog/ReusableDialog"

const columns = () => [
  {

    title: "Nombre", field: "name",
  },
  {
    title: "Descripcion", field: "descripcion"
  },
  {
    title: "Stock Disponible", field: "stock", type: 'numeric'
  },
  {
    title: "Precio", field: "price", type: "currency"
  },
  { title: 'Imagen', field: 'images', render: (product) => <img src={`http://localhost:4000/${product.images[0].fileName}`} alt="" border="3" height="100" width="100" /> },
]



// esta es la lista de productos en formato tabla exclusiva para los admin
const ProductListManagement = () => {
  const classes = Style();

  //hooks
  const [open, setOpen] = useState(false);

  //context de products
  const productsContext = useContext(ProductContext);
  const {
    products,
    getProducts,
    deleteProduct,
    saveCurrentProduct,
  } = productsContext;

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error } = snackbarContext

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const options = {
    actionsColumnIndex: -1,
    search: true,
    headerStyle: {
      backgroundColor: '#249DCD',
      color: 'white',
      fontWeight: 'bold'
    },
    rowStyle: {
      backgroundColor: '#FFF',
      fontSize: '14px'
    },
  }

  const selectProduct = (e, product) => {
    setOpen(true);
    saveCurrentProduct(product);
  };

  return (
    <Box className={classes.rootBox}>
      <MaterialTable title="Lista de Productos" data={products} columns={columns()} actions={[
        {
          icon: "edit",
          tooltip: 'editar producto',
          onClick: selectProduct
        },
        {
          icon: "delete",
          tooltip: 'eliminar producto',
          onClick: deleteProduct
        },
      ]}

        components={{
          Pagination: PatchedPagination,
        }}
        localization={
          {
            body: { emptyDataSourceMessage: "No hay elementos en la lista de productos" },
            header: { actions: "Acciones" }
          }
        }
        options={
          options
        }
      />
      {error ? <SnackbarOpen /> : null}
      <ReusableDialog open={open} onClose={() => setOpen(false)} >
        <AddProduct open={open} />
      </ReusableDialog>
    </Box>
  );
};

export default ProductListManagement;
