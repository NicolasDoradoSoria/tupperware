import React, {useContext, useState} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Style from "./Style";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import ProductContext from "../../context/productsContext/ProductContext";
const AddProduct = () => {
  const classes = Style();

//productContext
const productContext = useContext(ProductContext);
const {
  addProduct
} = productContext;

// hook de create user
const [product, setProduct] = useState({
  name: "",
  photoURL: "",
  price: 0,
  descripcion: ""
});

  const productChange= (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  const productSubmit = (e) => {
    e.preventDefault();

    // manda los datos de usuario a productContext
    addProduct(product);
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
                onChange={productChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Url de la Imagen"
                variant="outlined"
                
                fullWidth
                name="photoURL"
                required
                onChange={productChange}
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
          >
            Agregar Producto
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default AddProduct;
