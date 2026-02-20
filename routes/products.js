const express = require('express');
const products = require('../data/products');

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  try {
    res.json({
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product fetched successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
});

module.exports = router;
