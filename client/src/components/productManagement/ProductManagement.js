import React from "react";
import { Box, Grid } from "@material-ui/core";
import Style from "./Style";
import "./Style.css";
import SnackbarOpen from "../snackbar/SnackBar";
const ProductManagement = () => {
  const classes = Style();

  //productContext



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
        />
      </Box>
    </>
  );
};

export default ProductManagement;
