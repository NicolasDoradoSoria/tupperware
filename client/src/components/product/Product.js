import React from "react";
import Style from "./Style";
import { Link } from "react-router-dom";
import { CardMedia, CardContent, Typography, Button, Card } from "@material-ui/core";

const Product = ({ product }) => {
  const classes = Style();

  const { name, imageId, price, _id } = product;

  return (
    <Card className={classes.root} >
      <Link
        to={`/main/descripcion-producto/${_id}`}
        style={{ textDecoration: "none" }}
      >

        {imageId.files ? (
          <CardMedia
            className={classes.media}
            image={`http://localhost:4000/${imageId.files[0].fileName}`}
            title="Paella dish"
          />
        ) : null}
        <h1 className={classes.title}>{name}</h1>
        <CardContent className={classes.content} >
          <Typography variant="h5" component="h2" className={classes.price}>
            ${price}
          </Typography>
          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            Agregar
          </Button>
        </CardContent>
      </Link>

    </Card>
  );
};

export default Product;
