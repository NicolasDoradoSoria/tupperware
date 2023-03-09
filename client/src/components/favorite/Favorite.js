import React, { useEffect, useContext } from "react";

import Box from "@material-ui/core/Box";

import Style from "./Style";
import FavoritesContext from "../../context/favoriteContext/FavoriteContext";
import ProductContext from "../../context/productsContext/ProductContext";

import SnackbarOpen from "../snackbar/SnackBar";

import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import MaterialTable from "material-table"
import { PatchedPagination } from './TablePagination'
import { useNavigate } from "react-router";

const columns = () => [
  {

    title: "Nombre", field: "name",
  },
  {
    title: "Descripcion", field: "descripcion"
  },
  {
    title: "Precio", field: "price", type: "currency"
  },
  { title: 'Imagen', field: 'images', render: (product) => <img src={`http://localhost:4000/${product.images[0].fileName}`} alt="" border="3" height="100" width="100" /> },
]

const Favorite = () => {
  const classes = Style();
  const navigate = useNavigate()

  //context de products
  const productsContext = useContext(ProductContext);
  const {
    deleteProduct,
    msg
  } = productsContext;


  //  context de favoritos
  const favoritesContext = useContext(FavoritesContext)
  const {
    favoritesProducts,
    getFavorites
  } = favoritesContext
  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { openSnackbar } = snackbarContext


  useEffect(() => {
    getFavorites();

    if (msg) {
      openSnackbar(msg.msg, msg.category)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

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

  const clickHere = (e, rowData) => {
    navigate(`/main/descripcion-producto/${rowData._id}`)
  }
  return (
    <Box className={classes.root}>
      <div>

        <MaterialTable title="Mis Favoritos" data={favoritesProducts} columns={columns()} actions={[
          {
            icon: "delete",
            tooltip: 'eliminar producto',
            onClick: deleteProduct
          },
        ]}
          onRowClick={(event, rowData) => clickHere(event, rowData)}

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
      </div>
      {msg ? <SnackbarOpen /> : null}
    </Box>
  );
}

export default Favorite;