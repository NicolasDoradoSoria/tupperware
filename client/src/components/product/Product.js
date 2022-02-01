import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Style from "./Style";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const classes = Style();

  const { name, photoURL, price, _id } = product;

  return (
    <Card className={classes.root} >
      <Link
        to={`/main/descripcion-producto/${_id}`}
        style={{ textDecoration: "none" }}
      >

        {photoURL ? (<CardMedia
          className={classes.media}
          image={`http://localhost:4000/${photoURL}`}
          title="Paella dish"
        />) : null}
        <h1 className={classes.title}>{name}</h1>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.price}>
            ${price}
          </Typography>
        </CardContent>
      </Link>

    </Card>
  );
};

export default Product;
