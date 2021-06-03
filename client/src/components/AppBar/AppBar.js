import React, { useContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import Style from "./Style";
import "./Style.css";
import DraWer from "../Drawer/Drawer";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import UserContext from "../../context/productsContext/userContext/UserContext";
import Button from "@material-ui/core/Button";
import CartContext from "../../context/cartContext/CartContext";

export default function Appbar() {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { authenticated, user } = userContext;

   //cartContext
   const cartContext = useContext(CartContext);
   const { products, getOrder} = cartContext
 
useEffect(() => {
  getOrder(user.user._id)

}, [])
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
            <InputBase
              className="inputbase"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={products.length} color="secondary">
                <Link to={"/main/carrito"}>
                  <ShoppingCartIcon />
                </Link>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
  );
}
