import React, { useContext, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Style from "./Style";
import TextField from "@material-ui/core/TextField";
import { Box, Grid, GridList, Paper } from "@material-ui/core";
import ProductContext from "../../context/productsContext/ProductContext";
import { withRouter } from 'react-router-dom'
import BackupIcon from '@material-ui/icons/Backup';
import FileContext from "../../context/fileContext/FileContext";
import './Style.css';
const AddProduct = ({ history, open }) => {
  const classes = Style();

  //productContext
  const productContext = useContext(ProductContext);
  const {
    addProduct,
    selectedProduct,
    updateProduct,
    getProducts,
  } = productContext;


  //fileContext
  const fileContext = useContext(FileContext);
  const { postMultipleImage, getMultipleImages, images, deleteImage } = fileContext;

  // hook de create user
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    descripcion: "",
    files: []
  });

  const { name, price, descripcion } = product;

  const [selectImage, setSelectImage] = useState("")
  const [selectIdArrayImage, setSelectIdArrayImage] = useState("")
  const [productImageChange, setProductImageChange] = useState(false)
  useEffect(() => {
    if (open) {
      setProduct(selectedProduct);
    } else {
      setProduct({ name: "", price: 0, descripcion: "", files: [] });
      getMultipleImages()
      setProductImageChange(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productImageChange]);

  // manda la lista de imagenes del carrousel al context
  const imageHandleCarrouselSumbmit = async (e) => {
    try {
      postMultipleImage(e.target.files)
      setProductImageChange(true)
    } catch (error) {
      console.log(error)
    }
  }

  // destroyoning del hook product
  const productChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const productSubmit = (e) => {
    e.preventDefault();

    if (selectedProduct === null) {
      // manda los datos de usuario a productContext
      addProduct(product);
    } else {
      updateProduct(product);
    }
    getProducts()
    setProduct({ name: "", price: 0, descripcion: "" });

    history.push("/")
  };

  const addProductButtonDisabled = () => {
    return isEmpty(name) || isEmpty(descripcion);
  };

  const isEmpty = (aField) => {
    return aField === "";
  };

  //selecciona una imagen del carrousel haciendo click
  const selectImageCarrouselClick = (img, idArray) => {
    setSelectImage(img._id)
    setSelectIdArrayImage(idArray)
  }

  //selecciona una imagen del producto haciendo click
  const selectImageProductClick = (idImg) => {
    setSelectImage(idImg)
  }


  const deleteFileButton = () => {

    deleteImage(selectIdArrayImage, selectImage)
    setProductImageChange(true)
  }

  // guarda la lista de imagenes en el state de producto 
  const productImagesChange = (e) => {
    let images = product.files
    const files = e.target.files

    // esto lo tengo que hacer debido a que me devuelve una lista de forlist y eso hacer que no pueda usar .map o .foreach
    Array.from(files).forEach(file => images.push(file))

    setProduct({
      ...product,
      files: images,
    });
  }

  return (

    <>
      {/* ----------------------------------------------PRODUCT---------------------------------------------------------- */}
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

                {/* IMAGEN */}
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
                <Grid item xs={3}>
                  {
                    product.files.length ?
                      <div className={classes.divUploaderImage}>
                        {
                          product.files.map((image) =>
                            <div className={classes.divUploaderImage} key={image.lastModified}>

                              <Button onClick={() => selectImageProductClick(image.lastModified)} name="img" className={(selectImage === image.lastModified) ? classes.textImg : null} >
                                <img src={URL.createObjectURL(image)} alt="uploaded_image" width="130" height="auto" />
                              </Button>
                            </div>

                          )}
                      </div>
                      : null
                  }
                </Grid>

                <Grid item xs={3} >
                  <Grid>
                    <Button variant="contained" onClick={deleteFileButton}>Eliminar</Button>
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
      <Box>

        {/* -------------------------------------------------------------------------------CARROUSEL------------------------------------------------------------------------------------ */}
        <Typography variant="h4" component="h2" className={classes.divUploaderImage} >
          Agregar imagenes del Carrousel
        </Typography>
        <Paper component="form" className={classes.paperUploadedPhoto}>
          <Grid item xs={12} className={classes.gridTextarea}>

            <div>
              <div>
                <label htmlFor="file">
                  <BackupIcon style={{ fontSize: 90, cursor: "pointer" }} />
                </label>
                <input
                  multiple
                  type="file"
                  id="file"
                  name="file"
                  onChange={imageHandleCarrouselSumbmit}
                  className={classes.img}
                />
              </div>

              <div>
                <Button variant="contained" onClick={deleteFileButton}>Eliminar</Button>
              </div>
            </div>
            {
              images.length ?
                <div className={classes.divUploaderImage}>
                  {
                    images.map((imageGroup) =>
                      <div key={imageGroup._id} className={classes.divUploaderImage}>
                        {imageGroup.files.map((image) =>
                          <div key={image._id}>

                            <Button onClick={() => selectImageCarrouselClick(image, imageGroup._id)} name="img" className={(selectImage === image._id) ? classes.textImg : null} >

                              <img src={`http://localhost:4000/${image.fileName}`} alt="uploaded_image" width="130" height="auto" />
                            </Button>
                          </div>
                        )}
                      </div>

                    )}
                </div>
                : null
            }
          </Grid>
        </Paper>

      </Box>
    </>
  );
};

export default withRouter(AddProduct);
