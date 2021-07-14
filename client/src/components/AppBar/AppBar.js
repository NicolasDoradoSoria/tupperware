import React, { useContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import "./Style.css";
import DraWer from "../Drawer/Drawer";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import UserContext from "../../context/productsContext/userContext/UserContext";
import Button from "@material-ui/core/Button";
import CartContext from "../../context/cartContext/CartContext";
import ProductContext from "../../context/productsContext/ProductContext";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles, createStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(4),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: "inherit"
    },
    grow: {
      flexGrow: 1,
    },
    inputInput: {
      paddingLeft: `calc(1rem + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "50ch",
        "&:focus": {
          width: "30ch",
        }
      }
    },
  })
)
const Appbar = ({history}) =>{
  const classes = useStyles();
  //userContext
  const userContext = useContext(UserContext);
  const { authenticated, user } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { productsInCart, getOrder } = cartContext

  //context products
  const productsContext = useContext(ProductContext);
  const {
    searchProducts, getProducts, productsAll } = productsContext;

  useEffect(() => {
    getProducts()
    if(user){
      getOrder(user.user._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleSearch = async (e, values) => {
    e.preventDefault()
    history.push("/")
    searchProducts(values)
  }


  return (
    <AppBar position="static" style={{ background: "#212121" }} >
      <Toolbar>
        {authenticated ? (
          <DraWer />
        ) : (
          <Link to={"/login"}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Iniciar Secion
              </Button>
          </Link>
        )}

        <div className={classes.search} style={{ width: "50%" }}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>

          <Autocomplete
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={handleSearch}
            options={productsAll}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="buscar producto" variant="outlined" />
            )}
          />
        </div>
        <div className={classes.grow} />
        {(user) ?
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Link to={"/main/carrito"}>
              <Badge badgeContent={productsInCart.length} color="secondary">
                  <ShoppingCartIcon />
              </Badge>
                </Link>
            </IconButton>
           : null
        }
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Appbar)