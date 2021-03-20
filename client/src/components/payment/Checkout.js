import React, { Fragment, useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Review from "./Review";
import PaymentForm from "./Payment";
import Style from "./style";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import clienteAxios from "../../config/axios";
const steps = ["Payment details", "Review your order"];
const stripePromise = loadStripe(
  "pk_test_51IRoRnFCtaDdCCFUADGdN9b5MX1c5JWX9woDubBwgdzhiZ3iD1RDAw3qoGJ8I2DcS8h7Toci0wdSLeOfK6HjZiPZ00tTedftM3"
);

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PaymentForm />;
    case 1:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = Style();
  const [activeStep, setActiveStep] = useState(0);
  const [bandera, setBandera] = useState(false)
  // const elements = useElements();
  // const stripe = useStripe();

  // useEffect(() => {
  //   const effecto = async() =>{

  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: "card",
  //       card: elements.getElement(CardElement),
  //     });
      
  //     if (!error) {
  //       const { id } = paymentMethod;
  //       console.log(paymentMethod);
        
  //       const { data } = await clienteAxios.post("/api/carritoCompras", {
  //         id,
  //         amount: 10000,
  //     });
  //     console.log(data);
  //   }
  // }
  // if(bandera){
  //   effecto()

  // }
  // }, [bandera])



  const handleNext = () => {
    if(activeStep!==  1){
      setActiveStep(activeStep + 1);
    }
    else{
      setBandera(true)
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (activeStep === steps.length) {
  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: "card",
  //       card: elements.getElement(CardElement),
  //     });

  //     if (!error) {
  //       const { id } = paymentMethod;
  //       console.log(paymentMethod);

  //       const { data } = await clienteAxios.post("/api/carritoCompras", {
  //         id,
  //         amount: 10000,
  //       });
  //       console.log(data);
  //     }
  //   }
  // };


  return (
    <Elements stripe={stripePromise}>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Atras
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    >
                    {activeStep === steps.length - 1
                      ? "Place order"
                      : "Proximo"}
                  </Button>
                </div>
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
            </Elements>
  );
}
