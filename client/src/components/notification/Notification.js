import { Button, Card, CardContent, Typography } from "@material-ui/core";
import Style from "./Style";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartContext from "../../context/cartContext/CartContext";
import UserContext from "../../context/userContext/UserContext";

const Notification = () => {
    const classes = Style();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        id: "",
        status: ""
    })

    //userContext
    const userContext = useContext(UserContext);
    const { user } = userContext;

    //cartContext
    const cartContext = useContext(CartContext);
    const { cleanCart } = cartContext

    // navega a home
    const navigateHome = () => {
        navigate("/")
    }

    // elimina todos los productos en el carrito
    const deleteAllProduct = () => cleanCart(user.user._id)

    
    useEffect(() => {
        setOrder({
            ...order,
            id: searchParams.get('collection_id'),
            status: searchParams.get('status')
        })
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    useEffect(() => {
        // si el pago fue aprobado se vacia el carrito
        if (status === "approved") deleteAllProduct()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order])
    
    const { status, id } = order
    return (
        <>

            <div className={classes.root} >
                <Card className={classes.card}>
                    <div className={classes.iconContainer}>
                        <ShoppingCartIcon className={classes.icon} />
                    </div>
                    {status ?
                        <CardContent className={classes.cardContentAproved}>
                            <Typography variant="h3" component="h2">
                                Gracias <br />
                                por su compra!
                            </Typography>
                            <Typography className={classes.title} gutterBottom>
                                El numero de compra es: <br /> {id}
                            </Typography>
                            <div className={classes.buttonContainer}>
                                <Button variant="contained" color="primary" onClick={navigateHome}>
                                    Volver Al inicio
                                </Button>
                            </div>
                        </CardContent> : <CardContent className={classes.cardContentDeneg}>
                            <Typography variant="h3" component="h2">
                                No se a podido prosesar el pago
                            </Typography>

                        </CardContent>
                    }
                </Card>
            </div>
        </>
    );
}

export default Notification;