const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('./auth');


router.post('/checkout', auth, async (req, res) => {
  const { amount, currency = 'usd' } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send('Payment error');
  }
});

module.exports = router;
