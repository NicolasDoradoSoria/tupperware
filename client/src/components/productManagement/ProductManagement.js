import React from "react";
import AddProduct from "../addProduct/AddProduct";
import UpdateProduct from "../updateProduct/UpdateProduct";
import { Box, Grid } from "@material-ui/core";
import Style from "./Style";
import ListProductsTable from "../listProductsTable/ListProductsTable";
import "./Style.css";
const ProductManagement = () => {
  const classes = Style();
  return (
    <>
      <Box boxShadow={3} mt={3} className={classes.ProductManagementBox} >
        <Grid container spacing={4} className={classes.addproductGrid} >
          <Grid item xs={6} className={classes.addproductGrid}>
            <AddProduct />
          </Grid>
          <Grid item xs={6} className={classes.ListProductsGrid}>
            <ListProductsTable />
          </Grid>
          <Grid item xs={12}>
            <UpdateProduct />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductManagement;
