import { useContext } from 'react';
import UserContext from "../../context/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import { Button, ButtonGroup, Divider, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Style from "./Style";


const ProductCart = ({ product }) => {
    const classes = Style();
    //userContext
    const userContext = useContext(UserContext);
    const { user } = userContext;

    //cartContext
    const cartContext = useContext(CartContext);
    const { removeOrderProduct, generateOrder } = cartContext

    //eliminar un producto de la lista
    const deleteProduct = () => removeOrderProduct(user.user._id, product._id)

    const changeQuantity = (changeQuantity) => {
        const order = {
            "user": user.user._id,
            "products": [
                { "id": _id, "quantity": changeQuantity },
            ],
            "total": 133,
        }
        generateOrder(order)
    }

    const { name, descripcion, images, _id } = product.id
    return (
        <>
            <Grid item xs={12} md={4} className={classes.leftGridContainer}>
                {/* imagen del producto */}
                <img src={`http://localhost:4000/${images[0].fileName}`} alt="funca" className={classes.img} />
            </Grid>
            <Grid item xs={12} md={4} className={classes.centerGridContainer}>
                {/* Nombre del producto */}
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {/* Descripcion del producto */}
                    <Typography variant="body1" gutterBottom>
                        {descripcion}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Boton de elimimar producto del carrito*/}
                    <Typography variant="body1" gutterBottom>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={deleteProduct}
                        />
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} className={classes.rightGridContainer}>
                {/* boton de restar cantidad */}
                <div className={classes.buttonGroup}>

                    <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
                        <Button disabled={product.quantity >= product['countInStock']} onClick={() => { changeQuantity(1) }}>+</Button>
                        <Button disabled>{product.quantity}</Button>
                        <Button disabled={product.quantity <= 0} onClick={() => { changeQuantity(- 1) }}>-</Button>

                    </ButtonGroup>
                    <div>
                        {/* muestra el precio  */}
                        <Typography variant="h5" component="h2" >
                            ${product.price}
                        </Typography>
                    </div>
                </div>
                {/*  boton de sumar cantidad */}

            </Grid>
            <Divider style={{ width: '100%' }} />
        </>
    );
}

export default ProductCart;