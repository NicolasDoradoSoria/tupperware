import { Button, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import { useState } from "react";
import MercadoPagoIntegration from "../mercadoPagoIntegration/MercadoPagoIntegration";
// import Style from "./Style";


const PaymentSummary = ({orders}) => {
    // const classes = Style();
    const [isBuy, setIsBoy] = useState(false)

    const checkout = () => setIsBoy(true)

    if(!orders) return null
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