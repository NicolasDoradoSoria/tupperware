import React from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import clienteAxios from "../../config/axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Style from "./style";
import Paper from "@material-ui/core/Paper";
const stripePromise = loadStripe(
  "pk_test_51IRoRnFCtaDdCCFUADGdN9b5MX1c5JWX9woDubBwgdzhiZ3iD1RDAw3qoGJ8I2DcS8h7Toci0wdSLeOfK6HjZiPZ00tTedftM3"
);

const CheckoutForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const classes = Style();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      console.log(paymentMethod);

      const { data } = await clienteAxios.post("/api/carritoCompras", {
        id,
        amount: 10000,
      });
      console.log(data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <div className={classes.buttons}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Buy
        </Button>
      </div>
    </form>
  );
};

function PaymentMethod() {
  const classes = Style();
  return (
    <>
      <Elements stripe={stripePromise}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Metodo de Pago
            </Typography>

            <CheckoutForm />
          </Paper>
        </main>
      </Elements>
    </>
  );
}
export default PaymentMethod;
