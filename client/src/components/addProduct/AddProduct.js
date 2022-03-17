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
import { withRouter } from 'react-router-dom'
import './Style.css';

const AddProduct = ({ history, open }) => {
  const classes = Style();

  //productContext
  const productContext = useContext(ProductContext);
  const {
    addProduct,
    product,
    updateProduct,
    getProducts,
  } = productContext;

  // hook de create user
  const [productNew, setProductNew] = useState({
    name: "",
    price: 0,
    descripcion: "",
    files: [],
    stock: 0
  });

  const { name, price, descripcion } = productNew;

  const [selectImage, setSelectImage] = useState("")

  useEffect(() => {
    if (open) {
      setProductNew(product);
    } else {
      setProductNew({ name: "", price: 0, descripcion: "", files: [], stock: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // destroyoning del hook product
  const productChange = (e) => {
    setProductNew({
      ...productNew,
      [e.target.name]: e.target.value,
    });
  };

  const productSubmit = (e) => {
    e.preventDefault();

    if (product === null) {
      // manda los datos de usuario a productContext
      addProduct(productNew);
    } else {
      updateProduct(productNew);
    }
    getProducts()
    setProductNew({ name: "", price: 0, descripcion: "" });

    history.push("/")
  };

  // desabilitar el boton de agregar producto si alguno de los campos no fue completado
  const addProductButtonDisabled = () => {
    return isEmpty(name) || isEmpty(descripcion);
  };

  const isEmpty = (aField) => {
    return aField === "";
  };



  //selecciona una imagen del producto haciendo click
  const selectImageProductClick = (idImg, image) => {
    setSelectImage(idImg)

  }


  //elimina una imagen del producto
  const deleteImageProduct = () => {

    const productNuevo = productNew.files.filter(image => image !== selectImage)
    setProductNew({
      ...productNew,
      files: productNuevo
    })

  }

  // guarda la lista de imagenes en el state de producto 
  const productImagesChange = (e) => {
    let images = productNew.files
    const files = e.target.files

    // esto lo tengo que hacer debido a que me devuelve una lista de forlist y eso hacer que no pueda usar .map o .foreach
    Array.from(files).forEach(file => images.push(file))

    setProductNew({
      ...productNew,
      files: images,
    });
  }

  //desabilita el boton eliminar Imagen 
  const imageButtonDisabled = () => {
    return isEmpty(selectImage)
  }

  return (

    <>
      <Card className={classes.root}>
        <form noValidate onSubmit={productSubmit}>
          <CardContent>
            <Typography variant="h4" component="h2" className={classes.title}>
              Agregar Producto
            </Typography>

            {/* NOMBRE */}
            <Grid container spacing={3}>
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

              {/* PRECIO */}
              <Grid item xs={12} sm={6}>
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
              <Grid className={classes.gridConteinerImageAndStock}>
                {/* STOCK */}
                <Grid item xs={3}>
                  <Typography variant="h6" component="h2" className={classes.TextFieldStock}>
                    Stock
                  </Typography>
                  <TextField
                    className={classes.textFieldQuantity}
                    id="standard-number"
                    type="number"
                    name="stock"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={productChange}
                    defaultValue="1"
                    inputProps={{ min: "1" }}
                  />
                </Grid>

                {/* CARGAR IMAGEN */}
                <Grid item xs={3} >
                  <TextField
                    type="file"
                    id="outlined-b  asic"
                    variant="outlined"
                    name="productImages"
                    required
                    className={classes.textFieldImage}
                    onChange={productImagesChange}
                    inputProps={{
                      multiple: true
                    }}
                  />
                </Grid>
                {/* IMAGEN */}
                <Grid item xs={4}>
                  {
                    productNew.files.length ?
                      <div className={classes.divUploaderImage}>
                        {
                          productNew.files.map((image) =>
                            <div className={classes.divUploaderImage} key={image.lastModified}>

                              <Button onClick={() => selectImageProductClick(image)} name="img" className={(selectImage.lastModified === image.lastModified) ? classes.textImg : null} >
                                <img src={URL.createObjectURL(image)} alt="uploaded_image" width="130" height="130" />
                              </Button>
                            </div>

                          )}
                      </div>
                      : null
                  }
                </Grid>

                {/* ELIMINAR IMAGEN */}
                <Grid item xs={3} >
                  <Grid>
                    <Button variant="contained" onClick={deleteImageProduct} disabled={imageButtonDisabled()}>Eliminar</Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* DESCRIPCION */}
              <Grid item xs={12} >
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

          {/* BOTON AGREGAR PRODUCTO */}
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



      </Card>

    </>
  );
};

export default withRouter(AddProduct);
