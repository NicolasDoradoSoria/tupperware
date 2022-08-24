import React, { useContext } from "react";
import Style from "./Style";
import { Link, withRouter } from "react-router-dom";
import { CardMedia, CardContent, Typography, Button, Card } from "@material-ui/core";
import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";

const Product = ({ product, history }) => {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { user, authenticated } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { generateOrder } = cartContext

  const { name, images, price, _id, stock } = product;

  // desabilita los botones que no tengan stock
  const disableButton = () => {
    return stock === 0
  }

  // agregamos el producto al carrito directamente por default se agrega 1
  const addCartClick = () => {
    // si esta autenticado directamente agrega al carrito si no manda al usuario a la ventana de login
    if (authenticated) {

      const order = {
        "user": user.user._id,
        "products": [
          { "id": _id },
        ],
        "total": 133,
      }
      generateOrder(order)
    }
    else {
      history.push("/login")
    }

  }

  return (
    <Card className={classes.root} >
      {/* DESCRIPCION */}
      <Link
        to={`/main/descripcion-producto/${_id}`}
        style={{ textDecoration: "none" }}
      >
        {/* IMAGEN */}
        <CardMedia
          className={classes.media}
          image={`http://localhost:4000/${images[0].fileName}`}
          title="Paella dish"
        />
        {/* NOMBRE */}
        <h1 className={classes.title}>{name}</h1>
      </Link>
      
      <CardContent className={classes.content} >
        {/* PRECIO */}
        <Typography variant="h5" component="h2" className={classes.price}>
          ${price}
        </Typography>
        {/* BOTON AGREGAR */}
        {<Button
          className={classes.button}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={disableButton()}
          onClick={addCartClick}
        >
          {stock !== 0 ? <>Agregar</> : <>No disponible</>}
        </Button>}
      </CardContent>

    </Card>
  );
};

export default withRouter(Product);
