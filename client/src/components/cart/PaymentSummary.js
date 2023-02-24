import { Button, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cartContext/CartContext";
import MercadoPagoIntegration from "../mercadoPagoIntegration/MercadoPagoIntegration";

const PaymentSummary = () => {
    const [isBuy, setIsBoy] = useState(false)

    //cartContext
    const cartContext = useContext(CartContext);
    const { postSummary, orders } = cartContext

    const checkout = () => setIsBoy(true)

    useEffect(() => {

        postSummary()

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders])
    if (!orders) return null
    return (
        <>
            <Typography variant="h5" gutterBottom >
                Resumen
            </Typography>
            <Divider />
            <List disablePadding>
                <ListItem>
                    <ListItemText>
                        <Typography variant="body1" gutterBottom>
                            SubTotal
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Descuentos
                        </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <Typography variant="body1" gutterBottom>
                            ${orders.subtotal}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            ${orders.discount}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText >
                        <Typography variant="body1" gutterBottom>
                            Total a Pagar:
                        </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <Typography variant="body1" gutterBottom>
                            ${orders.total}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            {isBuy ? <MercadoPagoIntegration /> :
                <Button onClick={checkout} color="primary" variant="contained">
                    Finalizar Compra
                </Button>
            }
        </>);
}

export default PaymentSummary;