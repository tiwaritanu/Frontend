export const calculateTotal = (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return 0;
  }

  return cartItems.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + price * quantity;
  }, 0);
};
