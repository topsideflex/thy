const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const product = new Product({ name, description, price, imageUrl, user: req.user.id });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

