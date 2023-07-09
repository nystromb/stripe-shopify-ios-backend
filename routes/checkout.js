var express = require('express');
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

/*
  request should send customer access token
  use access token to get customer information from shopify, if it exists
  once we have the information from shopify, then create a stripe customer if it doesn to exist
  return the payment intent with the proper information
*/
router.post('/create_payment_intent', function(req, res, next) {
  console.log('request', req.query);
  res.send('respond with a resource');
});

/*
  Explain what this endpoint is supposed to do
*/
router.post('/ephemeral_keys', async function(req, res, next) {
  const { api_version } = req.query;
  console.log("query", req.query);
  try {
    let key = await stripe.ephemeralKeys.create(
      {customer: 'cus_NYdnkbtwWXbhmQ'
    },
      {apiVersion: `${api_version}`}
    );
    res.json(key);
  } catch(e) {
    console.error(e);
    res.send(500);
  }
});

router.post('/delete_account', function(req, res, next) {
  console.log('request', req.query);
  res.send('respond with a resource');
});

module.exports = router;
