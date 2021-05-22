import React, { useContext } from "react";
import { Box, Grid } from "@material-ui/core";
import Style from "./Style";
import "./Style.css";
import ProductContext from "../../context/productsContext/ProductContext";
import SnackbarOpen from "../snackbar/SnackBar";
const ProductManagement = () => {
  const classes = Style();

  //productContext
  const productContext = useContext(ProductContext);
  const { error, msg, severity, closeError } = productContext;

  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeError();
  };

  return (
    <>
      <Box boxShadow={3} mt={3} className={classes.ProductManagementBox}>
        <Grid container spacing={4} className={classes.addproductGrid}>
          <Grid item xs={6} className={classes.addproductGrid}>
            {/* <AddProduct /> */}
          </Grid>
          <Grid item xs={6} className={classes.ListProductsGrid}>
            {/* <ListProductsTable /> */}
          </Grid>
         
        </Grid>

        <SnackbarOpen
          msg={msg}
          open={error}
          severity={severity}
          handleClose={handleClose}
        />
      </Box>
    </>
  );
};

export default ProductManagement;
