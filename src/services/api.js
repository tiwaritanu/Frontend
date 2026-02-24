const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products?limit=200`);

  if (!response.ok) {
    throw new Error('Failed to fetch products. Please try again.');
  }

  const data = await response.json();
  return Array.isArray(data?.products) ? data.products : [];
};
