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
import SnackbarOpen from "../snackbar/SnackBar";
import UpdateProduct from "../updateProduct/UpdateProduct";
import TablePagination from "@material-ui/core/TablePagination";
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const ListProductsTable = () => {
  const classes = Style();

  //hooks
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  //context de products
  const productsContext = useContext(ProductContext);
  const {
    products,
    getProducts,
    deleteProduct,
    addProduct,
    error,
    msg,
    severity,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const EnhancedTableToolbar = (props) => {
    const classes = Style();
    const { numSelected } = props;

    return (
      <Toolbar
        className={clsx(classes.enhancedTableToolbarRoot, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.enhancedTableToolbarRootTitle}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : null}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
    );
  };
  if (products.length === 0) return null;
  return (
    <>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer component={Paper} className={classes.root}>
        <Typography variant="h4" component="h2" className={classes.title}>
          Lista de productos
        </Typography>
        <Table aria-label="simple table" pageSize={5}>
          <TableHead>
            <TableRow>
            <TableCell padding="checkbox">
          <Checkbox
            indeterminate={selected.length > 0 && selected.length < products.length}
            checked={products.length > 0 && selected.length === products.length}
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
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
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => {
                const isItemSelected = isSelected(product.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    key={product._id}
                    hover
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    role="checkbox"
                    onClick={(event) => handleClick(event, product.name)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
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

export default ListProductsTable;
