const express = require('express');
const authMiddleware = require('../middleware/auth');
const { carts, getCartId } = require('../data/db');
const products = require('../data/products');

const router = express.Router();

// Get cart for user
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const cart = carts[userId] || { id: null, items: [], total: 0 };
    res.json({ message: 'Cart fetched successfully', data: cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
});

// Add item to cart
router.post('/add', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Validation
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    // Check if product exists
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Initialize cart if doesn't exist
    if (!carts[userId]) {
      carts[userId] = {
        id: getCartId(),
        items: [],
        total: 0,
      };
    }

    // Check if item already in cart
    const existingItem = carts[userId].items.find(item => item.productId === parseInt(productId));

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      carts[userId].items.push({
        productId: parseInt(productId),
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity),
      });
    }

    // Calculate total
    carts[userId].total = carts[userId].items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.json({
      message: 'Item added to cart',
      data: carts[userId],
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
});

// Remove item from cart
router.post('/remove', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Validation
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    if (!carts[userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove item
    carts[userId].items = carts[userId].items.filter(
      item => item.productId !== parseInt(productId)
    );

    // Calculate total
    carts[userId].total = carts[userId].items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.json({
      message: 'Item removed from cart',
      data: carts[userId],
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
});

// Update item quantity
router.post('/update', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Validation
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    if (!carts[userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = carts[userId].items.find(item => item.productId === parseInt(productId));
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = parseInt(quantity);

    // Calculate total
    carts[userId].total = carts[userId].items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.json({
      message: 'Cart updated',
      data: carts[userId],
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart', error: error.message });
  }
});

// Clear cart
router.post('/clear', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    carts[userId] = {
      id: getCartId(),
      items: [],
      total: 0,
    };
    res.json({
      message: 'Cart cleared',
      data: carts[userId],
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
});

module.exports = router;
