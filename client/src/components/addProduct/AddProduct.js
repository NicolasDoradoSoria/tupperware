import React, { useContext, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Style from "./Style";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import ProductContext from "../../context/productsContext/ProductContext";
import SnackbarOpen from "../snackbar/SnackBar";
import {withRouter} from 'react-router-dom'
const AddProduct = ({ history, open }) => {
  const classes = Style();

  //productContext
  const productContext = useContext(ProductContext);
  const {
    addProduct,
    selectedProduct,
    updateProduct,
    error,
    closeError,
    msg,
    severity,
  } = productContext;

  // hook de create user
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    descripcion: "",
  });
  const { name, price, descripcion } = product;
  const [archivo, setArchivo] = useState("");

  useEffect(() => {
    closeError()
    if (open) {
      setProduct(selectedProduct);
    } else {
      setProduct({ name: "", price: 0, descripcion: "" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // destroyoning del hook product
  const productChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const readFileChange = (e) => {
    setArchivo(e.target.files[0]);

  };

  const productSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct === null) {
      // manda los datos de usuario a productContext
      addProduct(product, archivo);
    } else {
      updateProduct(product);
    }

    setProduct({ name: "", photoURL: "", price: 0, descripcion: "" });

    history.push("/")
  };

  const addProductButtonDisabled = () => {
    return isEmpty(name) || isEmpty(descripcion);
  };

  const isEmpty = (aField) => {
    return aField === "";
  };

  return (
    <Card className={classes.root}>
      <form noValidate onSubmit={productSubmit}>
        <CardContent>
          <Typography variant="h4" component="h2" className={classes.title}>
            Agregar Producto
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                label="Nombre Del Producto"
                variant="outlined"
                placeholder="ingrese nombre del producto"
                fullWidth
                name="name"
                required
                value={name}
                onChange={productChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="file"
                id="outlined-basic"
                variant="outlined"
                fullWidth
                name="photoURL"
                required
                onChange={readFileChange}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridTextarea}>
              {/* <TextField
                id="standard-select-currency"
                select
                label="Categoria"
                helperText="Ingrese la categoria"
                fullWidth
                
              /> */}
            </Grid>
            <Grid item xs={6} className={classes.gridTextarea}>
              <TextField
                id="outlined-number"
                label="Precio"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                variant="outlined"
                placeholder="ingrese precio"
                fullWidth
                required
                value={price}
                name="price"
                onChange={productChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridTextarea}>
              <TextField
                id="outlined-textarea"
                label="Descripcion"
                placeholder="ingrese Descripcion"
                multiline
                fullWidth
                required
                variant="outlined"
                value={descripcion}
                name="descripcion"
                onChange={productChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.addProductButton}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            disabled={addProductButtonDisabled()}
          >
            Agregar Producto
            </Button>

        </CardActions>
      </form>
      {error ? <SnackbarOpen msg={msg} severity={severity} /> : null}
    </Card>
  );
};

export default withRouter(AddProduct);
