import React, { useEffect, useContext, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SnackbarOpen from "../snackbar/SnackBar";
import UpdateProduct from "../updateProduct/UpdateProduct";
import TablePagination from "@material-ui/core/TablePagination";
import TableColumnName from "./TableColumnName";
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const ProductListManagement = () => {
  const classes = Style();

  //hooks
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  //context de products
  const productsContext = useContext(ProductContext);
  const {
    products,
    getProducts,
    deleteProduct,
    error,
    msg,
    severity,
    saveCurrentProduct,
    searchProducts
  } = productsContext;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectProduct = (product) => {
    setOpen(true);
    saveCurrentProduct(product);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleSearch = async e => {
    e.preventDefault()
    let target = e.target;
    searchProducts({ name: target.value })
  }

  if (products.length === 0) return null;
  return (
    <>
      <Paper component="form" className={classes.rootSearch}>
        <InputBase
          className={classes.input}
          placeholder="Buscar Producto"
          inputProps={{ 'aria-label': 'Buscar Producto' }}
          onChange={handleSearch}

        />
        <IconButton >
          <SearchIcon />
        </IconButton>
      </Paper>

      <TableContainer component={Paper} className={classes.root}>
        <Typography variant="h4" component="h2" className={classes.title}>
          Lista de productos
        </Typography>
        <Table aria-label="simple table" pageSize={5}>
          <TableColumnName
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {stableSort(products, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
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
                      {product.descripcion}
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
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      {error ? <SnackbarOpen msg={msg} severity={severity} /> : null}
      <UpdateProduct open={open} onClose={() => setOpen(false)}></UpdateProduct>
    </>
  );
};

export default ProductListManagement;
