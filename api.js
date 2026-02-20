import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE);

export const apiClient = axios.create({
  baseURL: API_BASE,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (email, password, name) =>
    apiClient.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

// Product APIs
export const productAPI = {
  getAll: () => apiClient.get('/products'),
  getById: (id) => apiClient.get(`/products/${id}`),
};

// Cart APIs
export const cartAPI = {
  getCart: () => apiClient.get('/cart'),
  addItem: (productId, quantity) =>
    apiClient.post('/cart/add', { productId, quantity }),
  removeItem: (productId) =>
    apiClient.post('/cart/remove', { productId }),
  updateItem: (productId, quantity) =>
    apiClient.post('/cart/update', { productId, quantity }),
  clearCart: () => apiClient.post('/cart/clear'),
};
