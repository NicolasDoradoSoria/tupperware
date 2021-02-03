import React, { useEffect, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Delete from "@material-ui/icons/Delete";
const ListProductsTable = () => {
  const classes = Style();

  const productsContext = useContext(ProductContext);
  const { products, getProducts, deleteProduct, addProduct } = productsContext;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProduct]);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.title}>
        Lista de productos
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" className={classes.tableName}>
              Productos
            </TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">precio</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell
                component="th"
                scope="row"
                align="right"
                className={classes.tableName}
              >
                {product.name}
                
              </TableCell>
              <TableCell align="right">{product.calories}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">{product.carbs}</TableCell>
              <TableCell align="right" ><Button variant="contained" color="secondary" className={classes.removeIcon}  onClick={() => deleteProduct(product._id)}>presiona<Delete /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListProductsTable;
