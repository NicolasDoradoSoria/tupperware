/**
 * Use the CSS tab above to style your Element's container.
 */
import React from "react";
import "./CardSectionStyles.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import clienteAxios from "../../config/axios";
import Button from "@material-ui/core/Button";
const stripePromise = loadStripe(
  "pk_test_51IRoRnFCtaDdCCFUADGdN9b5MX1c5JWX9woDubBwgdzhiZ3iD1RDAw3qoGJ8I2DcS8h7Toci0wdSLeOfK6HjZiPZ00tTedftM3"
);
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const CheckoutForm = () => {
  const elements = useElements();
  const stripe = useStripe();
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
      console.log(data)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <Button type="submit" color="primary" variant="contained">
        Buy
      </Button>
    </form>
  );
};
function CardSection() {
  return (
    <Elements stripe={stripePromise} c>
      <CheckoutForm />
    </Elements>
  );
}

export default CardSection;
