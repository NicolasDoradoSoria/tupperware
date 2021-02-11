import React, { useEffect, useContext, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import UpdateProduct from "../updateProduct/UpdateProduct";
const ListProductsTable = () => {
  const classes = Style();

  const [open, setOpen] = useState(false);

  const productsContext = useContext(ProductContext);
  const {
    products,
    getProducts,
    deleteProduct,
    addProduct,
    saveCurrentProduct,
  } = productsContext;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProduct]);

  const selectProduct = (product) => {
    setOpen(true);
    saveCurrentProduct(product);
  };

  if (products.length === 0) return null;
  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Typography variant="h4" component="h2" className={classes.title}>
          Lista de productos
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" className={classes.column}>
                Productos
              </TableCell>
              <TableCell align="right" className={classes.column}>
                Categoria
              </TableCell>
              <TableCell align="right" className={classes.column}>
                precio
              </TableCell>
              <TableCell align="right" className={classes.column}>
                Stock
              </TableCell>
              <TableCell align="center" className={classes.column}>
                Accion
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} hover>
                <TableCell
                  component="th"
                  scope="row"
                  align="right"
                  className={classes.column}
                >
                  {product.name}
                </TableCell>
                <TableCell align="right" className={classes.column}>
                  {product.calories}
                </TableCell>
                <TableCell align="right" className={classes.column}>
                  {product.price}
                </TableCell>
                <TableCell align="right" className={classes.column}>
                  {product.carbs}
                </TableCell>
                <TableCell align="right" className={classes.columnAction}>
                  <Box className={classes.actionBox}>
                    <Button
                      variant="contained"
                      className={classes.removeIcon}
                      onClick={() => selectProduct(product)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.removeIcon}
                      onClick={() => deleteProduct(product._id)}
                    >
                      <Delete />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateProduct open={open} onClose={() => setOpen(false)}></UpdateProduct>
      
    </>
  );
};

export default ListProductsTable;
