const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//Endpoint 1: Calculate the total price of items in the cart//

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalprice = newItemPrice + cartTotal;
  res.send(totalprice.toString());
});

//Endpoint 2 : Apply a discount based on membership status//

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let result;
  if (isMember) {
    result = cartTotal - (cartTotal * 10) / 100;
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});

//Endpoint 3 : Calculate tax on the cart total//

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalprice = (cartTotal * 5) / 100;
  res.send(finalprice.toString());
});

//Endpoint 4 : Estimate delivery time based on shipping method//

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = req.query.distance;
  let deliverydays;
  if (shippingMethod === 'standard') {
    deliverydays = distance / 50;
  } else {
    deliverydays = distance / 100;
  }
  res.send(deliverydays.toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance//

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingcost = weight * distance * 0.1;
  res.send(shippingcost.toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyalpoints = purchaseAmount * 2;
  res.send(loyalpoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
