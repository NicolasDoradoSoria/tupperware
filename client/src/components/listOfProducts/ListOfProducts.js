import { useContext, useEffect, useState } from "react";
import Product from "../product/Product";
import { Box, Grid, Typography } from "@material-ui/core";
import Style from "./Style";
import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

//context
import ProductContext from "../../context/productsContext/ProductContext";
import CategoryContext from "../../context/categoryContext/CategoryContext";
import { useParams } from 'react-router-dom';

// lista de productos principal
const ListOfProducts = () => {
  const classes = Style();

  // context products
  const productsContext = useContext(ProductContext)
  const { products, getFilterProductByCategory, getProducts, msg } = productsContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { openSnackbar } = snackbarContext

  //CategoryContext
  const categoryContext = useContext(CategoryContext)
  const { categorySearch, selectedCategory, cleanCategory } = categoryContext
  
  //hooks
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      categorySearch(id)
      getFilterProductByCategory(id)
    }
    else {
      cleanCategory()
      getProducts()
      localStorage.setItem("Products", JSON.stringify(products))
    }
    if (msg) openSnackbar(msg.msg, msg.category)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg])

  const handleChangePage = (event, newPage) => setPage(newPage);


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (products.length === 0) return null
  return (
    <>
      <div className={classes.root}>
        <Box>
          <Typography variant="h2" className={classes.title}>
            {selectedCategory ? selectedCategory.name : <p>Productos</p>}
          </Typography>
        </Box>
        <div className={classes.gridProducts}>
          <Grid container spacing={4} >
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={product._id} >
                <Product product={product} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Paper className={classes.paperPagination}>
                <TablePagination
                  rowsPerPageOptions={[6, 12, 24]}
                  component="div"
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
        {msg ? <SnackbarOpen /> : null}
      </div>
    </>
  );
};

export default ListOfProducts;
