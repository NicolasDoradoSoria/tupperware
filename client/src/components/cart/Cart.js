import React, { useState, useContext } from 'react';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { IconButton, MenuItem, Menu, Badge, Box, Button } from "@material-ui/core";
import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import Style from "./Style";
import MaterialTableCart from '../shoppingCart/MaterialTableCart';
import { Link } from "react-router-dom";

// icono del carrito 
const Cart = () => {
    const classes = Style();
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    //userContext
    const userContext = useContext(UserContext);
    const { user } = userContext;

    //cartContext
    const cartContext = useContext(CartContext);
    const { productsInCart } = cartContext

    const handleMenu = (e) => setAnchorEl(e.currentTarget)

    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <Badge badgeContent={user ? productsInCart.length : null} color="secondary" overlap="rectangular">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            
                <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={
                    {
                        vertical: "top",
                        horizontal: "right"
                    }
                }
                    keepMounted
                    transformOrigin={
                        {
                            vertical: "top",
                            horizontal: "right"
                        }
                    }
                    open={open}
                    onClose={handleClose}>
                    <MenuItem >
                        <Box className={classes.CartMenu}>
                            <MaterialTableCart />
                        </Box>
                    </MenuItem>
                    <MenuItem >
                        <Link to={"/main/carrito"}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                >
                                Ir Al carrito
                            </Button>
                        </Link>
                    </MenuItem>
                </Menu>
        </>
    );
}

export default Cart;