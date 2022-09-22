import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import "./Style.css";
import DraWer from "../Drawer/Drawer";
import Search from '../search/Search'
import Cart from "../cart/Cart";
import Style from "./Style";

const Header = () => {
  const classes = Style();

  return (
    <AppBar position="fixed" style={{ background: "#CDA6C2" }} >
      <Toolbar>
          <DraWer />
        
        <Box flexGrow={1} display={{ xs: "none", sm: 'block' }} className={classes.titleBox}>
        </Box>
        <Search />
        <Cart />

      </Toolbar>
    </AppBar>
  );
}

export default Header