import React, { createContext, useContext, useState } from "react";

// Membuat context untuk keranjang
const CartContext = createContext();

// Provider untuk menyediakan state keranjang ke komponen lain
export const CartProvider = ({ children }) => {
  // State untuk menyimpan item di keranjang
  const [cartItems, setCartItems] = useState([]);

  // Fungsi untuk menambah item ke keranjang
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Fungsi untuk mengurangi jumlah item
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Fungsi untuk menambah jumlah item
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Fungsi untuk memperbarui jumlah item secara langsung
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Fungsi untuk menghitung total item di keranjang
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Fungsi untuk menghitung total harga
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Fungsi untuk mengosongkan keranjang
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        updateQuantity,
        getCartCount,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook untuk menggunakan context keranjang
export const useCart = () => useContext(CartContext);