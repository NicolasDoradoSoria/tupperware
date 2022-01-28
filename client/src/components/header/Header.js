import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import "./Style.css";
import DraWer from "../Drawer/Drawer";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Search from '../search/Search'
import Cart from "../cart/Cart";
import Style from "./Style";
import logo from './logo.JPG';
//context
import UserContext from "../../context/productsContext/userContext/UserContext";

const Header = () => {
  const classes = Style();
  //userContext
  const userContext = useContext(UserContext);
  const { authenticated } = userContext;

  return (
    <AppBar position="static" style={{ background: "#B05CAB" }} >
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
        <Box flexGrow={1} display={{ xs: "none", sm: 'block' }} className={classes.titleBox}>
        </Box>
        <Search />
        <Cart />

      </Toolbar>
    </AppBar>
  );
}

export default Header