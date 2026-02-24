import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateTotal } from '../utils/calculateTotal';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cart_items', []);

  const totalItems = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );

  const cartValue = useMemo(() => calculateTotal(cartItems), [cartItems]);

  const addToCart = (product) => {
    if (!product || product.stock <= 0) {
      return { success: false, message: 'Item is out of stock.' };
    }

    let result = { success: true, message: 'Item added to cart.' };

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...prev, { ...product, quantity: 1 }];
      }

      if (existingItem.quantity >= existingItem.stock) {
        result = { success: false, message: 'Cannot exceed available stock.' };
        return prev;
      }

      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });

    return result;
  };

  const increaseQuantity = (id) => {
    let result = { success: true, message: 'Quantity updated.' };

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.quantity >= item.stock) {
          result = { success: false, message: 'Cannot exceed available stock.' };
          return item;
        }

        return { ...item, quantity: item.quantity + 1 };
      }),
    );

    return result;
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const checkout = () => {
    if (cartItems.length === 0) {
      return { success: false, message: 'Your cart is empty.' };
    }

    const invalidItem = cartItems.find((item) => item.quantity > item.stock);
    if (invalidItem) {
      return {
        success: false,
        message: `Insufficient stock for ${invalidItem.title}.`,
      };
    }

    clearCart();
    return { success: true, message: 'Order placed successfully' };
  };

  const value = {
    cartItems,
    totalItems,
    cartValue,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
