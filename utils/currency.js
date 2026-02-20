// Format price in Indian Rupees
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Alternative simple formatter
export const formatPriceSimple = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};
