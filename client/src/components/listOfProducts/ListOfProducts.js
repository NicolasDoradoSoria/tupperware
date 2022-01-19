import React, { useContext, useEffect, useState } from "react";

import Product from "../product/Product";
import { Box, Grid, Typography } from "@material-ui/core";
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";
import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Carrousel from "../carousel/Carousel";
// lista de productos principal
const ListOfProducts = () => {
  const classes = Style();
  // context products
  const productsContext = useContext(ProductContext)
  const { products, getProducts } = productsContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error, closeSnackbar } = snackbarContext

  //hooks
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  useEffect(() => {
    if (products === null) {
      getProducts()
    }
    setTimeout(closeSnackbar, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (products.length === 0) return null
  return (
<>
<Carrousel />
    <div className={classes.root}>
      <Box>
        <Typography variant="h2" className={classes.title}>
          Productos
        </Typography>
      </Box>
      <Box boxShadow={3} className={classes.boxProducts}>
        <Grid container spacing={4} className={classes.gridProducts}>
          {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (

            <Grid item xs={12} sm={6} md={4} className={classes.products} key={product._id} >
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
        <Paper className={classes.paperPagination}>

          <TablePagination
            rowsPerPageOptions={[6, 12, 24]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {error ? <SnackbarOpen /> : null}
    </div>
    </>
  );
};

export default ListOfProducts;
