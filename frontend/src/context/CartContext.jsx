import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (pet) => {
    setCartItems((prev) => [...prev, pet]);
  };

  const removeFromCart = (petId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== petId));
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = (orderDetails, items) => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      email: orderDetails.email,
      items: items.map(i => i.name),
      status: 'Processing'
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, orders, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
