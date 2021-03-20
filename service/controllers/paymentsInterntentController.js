const stripe = require("stripe")(process.env.STRIPE_SK)
const getOrdenAmaount = require("../data/getOrdenAmaount");

exports.payment = async (req, res) => {
try {
    const products = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await getOrdenAmaount(products),
      currency: "USD",
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });   
} catch (error) {
    console.log(error)
}
 
}
