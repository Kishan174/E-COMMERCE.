// In-memory database for demo purposes
let users = [];
let carts = {};
let cartIdCounter = 1;

module.exports = {
  users,
  carts,
  getCartId: () => cartIdCounter++,
};
