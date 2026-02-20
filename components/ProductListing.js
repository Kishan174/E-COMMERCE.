import React, { useState, useEffect, useContext } from 'react';
import { productAPI, cartAPI } from '../api';
import { AuthContext } from '../context/AuthContext';
import { formatPrice } from '../utils/currency';
import '../styles/Products.css';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.data);
      const initialQuantities = {};
      response.data.data.forEach(product => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      alert('Please login first');
      return;
    }

    try {
      await cartAPI.addItem(productId, quantities[productId]);
      setAddedItems((prev) => ({
        ...prev,
        [productId]: true,
      }));
      setTimeout(() => {
        setAddedItems((prev) => ({
          ...prev,
          [productId]: false,
        }));
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add item');
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      <h1>Shop Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name}
              onError={handleImageError}
            />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">{formatPrice(product.price)}</p>
            <p className="stock">Stock: {product.stock}</p>
            <div className="product-actions">
              <input
                type="number"
                min="1"
                value={quantities[product.id]}
                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                className="quantity-input"
              />
              <button
                className={`add-btn ${addedItems[product.id] ? 'added' : ''}`}
                onClick={() => handleAddToCart(product.id)}
                disabled={product.stock === 0}
              >
                {addedItems[product.id] ? '✓ Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
