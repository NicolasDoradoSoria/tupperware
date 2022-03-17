import React, { useState, useEffect, useContext } from 'react';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import UserContext from "../../context/productsContext/userContext/UserContext";
import ProductContext from "../../context/productsContext/ProductContext";
import CartContext from "../../context/cartContext/CartContext";
import Style from "./Style";
import MaterialTableCart from '../shoppingCart/MaterialTableCart';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const columns = () => [
    {

        title: "Nombre", field: "id.name"
    },
    {
        title: "Precio", field: "id.price"
    },
    {
        title: "Cantidad", field: "quantity"
    },
    // { title: '', field: 'id.photoURL', render: item => <img src={`http://localhost:4000/${item.id.photoURL}`} alt="" border="3" height="100" width="100" /> },
]

const options = {
    paging: false,
    search: false,
    actionsColumnIndex: -1,
}
const Cart = () => {
    const classes = Style();
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    //userContext
    const userContext = useContext(UserContext);
    const { user } = userContext;

    //context products
    const productsContext = useContext(ProductContext);
    const {
        getProducts } = productsContext;

    //cartContext
    const cartContext = useContext(CartContext);
    const { productsInCart, getOrder } = cartContext


    useEffect(() => {
        getProducts()
        if (user) {
            getOrder(user.user._id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    if (!user) return null
    return (
        <div>
            <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit"> <Badge badgeContent={productsInCart.length} color="secondary">
                <ShoppingCartIcon />
            </Badge></IconButton>
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

                        <MaterialTableCart columns={columns()} options={options} />
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
        </div>
    );
}

export default Cart;