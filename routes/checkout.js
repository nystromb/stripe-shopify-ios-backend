var express = require('express');
var router = express.Router();

/*
  Explain what this endpoint is supposed to do
*/
router.post('/create_payment_intent', function(req, res, next) {
  // request should send customer access token
  // use access token to get customer information from shopify, if it exists
  // once we have the information from shopify, then create a stripe customer if it doesn to exist
  // return the payment intent with the proper information
  console.log('request', req);
  res.send('respond with a resource');
});


/*
  Explain what this endpoint is supposed to do
*/
router.post('/ephemeral_keys', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
