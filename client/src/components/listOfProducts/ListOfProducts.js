import React, { useContext, useEffect } from "react";

import Product from "../product/Product";
import { Box, Grid } from "@material-ui/core";
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";
import "./Style.css";
import SnackbarOpen from "../snackbar/SnackBar";
const ListOfProducts = () => {
  // context products
  const productsContext = useContext(ProductContext)
  const {products, getProducts, error, msg, severity} = productsContext
  const classes = Style();

  
  useEffect(() => {
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if (products.length === 0) return null
  return (
    <div className="ListOfProducts">
      <Box boxShadow={3} className="BoxProducts">
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} className={classes.root}  key={product._id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {error ? <SnackbarOpen msg={msg} severity={severity} /> : null}
      </div>
  );
};

export default ListOfProducts;
