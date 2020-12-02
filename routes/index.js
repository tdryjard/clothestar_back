const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();
const checkToken = require('../middlewares/webToken/checkToken')
const checkTokenCookie = require('../middlewares/webToken/checkTokenCookie')

const user = require('./register/register.route')
const image = require('./image/image.route')
const product = require('./product/product.route')
const dress = require('./dress/dress.route')
const star = require('./star/star.route')
const advice = require('./advice/advice.route')
const db = require('../models/database')

router.use(cookieParser());

router.use('/admin', cors({ credentials: true, origin: process.env.ORIGIN_URL }), user)

router.use('/image', cors({ credentials: true, origin: process.env.ORIGIN_URL }), image)

router.use('/product', cors({ credentials: true, origin: process.env.ORIGIN_URL }), product)

router.use('/dress', cors({ credentials: true, origin: process.env.ORIGIN_URL }), dress)

router.use('/star', cors({ credentials: true, origin: process.env.ORIGIN_URL }), star)

router.use('/advice', cors({ credentials: true, origin: process.env.ORIGIN_URL }), advice)

router.use('/create-customer', cors({ credentials: true, origin: process.env.ORIGIN_URL }), async (req, res) => {
  // Create a new customer object
  const customer = await stripe.customers.create({
    email: req.body.email,
    name: req.body.name,
    address: {
      line1: req.body.address,
      city: req.body.city,
      postal_code: req.body.codePostal,
      country: req.body.country
    },
    description : req.body.description
  });

  // Recommendation: save the customer.id in your database.
  res.send({ customer });
});

router.use('/secret', cors({ credentials: true, origin: process.env.ORIGIN_URL }), async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: parseInt(req.body.price * 100),
    currency: 'eur',
    customer: req.body.customer,
    payment_method_types: ['card'],
    receipt_email: req.body.email
  });
  res.json({ client_secret: intent.client_secret });
});

/*router.use('/create-product', cors({ credentials: true, origin: process.env.ORIGIN_URL }), (req, res) => {
  const checkingToken = checkToken(req, res)
  const checkingTokenCookie = checkTokenCookie(res, req)
  if ((checkingToken === false) || checkingTokenCookie === false) {
    return res.status(400).send({
      message: 'error token'
    })
  }

  try {
    stripe.products.create(
      { name: req.body.pseudo },
      function (err, confirmation) {
        if (err) {
          return res.status('402').send({ error: { message: err.message } });
        }
        else if (confirmation) return res.send(confirmation).status(200);
      }
    );
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }
  return res.status(200);
});*/

router.use('/verif-token', cors({ credentials: true, origin: process.env.ORIGIN_URL }), function (req, res) {

  const checkingToken = checkToken(req, res)
  const checkingTokenCookie = checkTokenCookie(res, req)
  if ((checkingToken === false) || checkingTokenCookie === false) {
    return res.status(400).send({ type: 'error' })
  }

  return res.status(200).send({ type: 'success' })
})

router.use('/cookie', cors({ credentials: true, origin: process.env.ORIGIN_URL }), function (req, res) {


  // Génération du jsonWebToken
  const token = jwt.sign('5', `${process.env.SECRET_KEY}`);

  res.cookie('token', token, { maxAge: (Date.now() / 1000 + (60 * 60 * 120)), httpOnly: true });
  res.send('cookie ok')
})

router.use('/promoCode', cors({ credentials: true, origin: process.env.ORIGIN_URL }), function (req, res) {
  db.query(`SELECT * from promoCode where name = '${req.body.promoCode}'`, (err, dbResult) => {
    if (err) {
      return err
    }
    if (dbResult.length) {
      return res.send(dbResult)
    }

    return false
  });
})

module.exports = router;