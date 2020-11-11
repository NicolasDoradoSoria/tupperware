import React from "react";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Style from "./Style";
import PriceProduct from "../priceProduct/PriceProduct";
import Button from "@material-ui/core/Button";
import './Style.css';

const ProductDescription = () => {
  const classes = Style();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <img
                  src="https://www.bbva.com/wp-content/uploads/2017/11/iceberg-recurso-fondo-de-comercio-bbva-1024x416.jpg"
                  alt="imagen"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <PriceProduct />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                chauuuuuuuuuussssssssssssssssssssssss
                <div className="buttonCenter">
                  <Button variant="contained" color="primary">
                    Agregar al carrito
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ProductDescription;
