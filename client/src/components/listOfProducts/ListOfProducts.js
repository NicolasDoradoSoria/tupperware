import React, { Fragment, useContext, useEffect } from "react";

import Product from "../product/Product";
import { Box, Grid } from "@material-ui/core";
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";

const ListOfProducts = () => {

  const productsContext = useContext(ProductContext)
  const {products, getProducts} = productsContext
  const classes = Style();

  useEffect(() => {
    getProducts()
  }, [])

  if (products.length === 0) return null
  return (
    <Fragment>
      <Box bgcolor="text.secondary" boxShadow={3}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} className={classes.root}>
              <Product product={product} key={product.id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ListOfProducts;
