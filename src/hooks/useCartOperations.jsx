import { useCart } from "react-use-cart";

export const useCartOperations = () => {
  const {
    isEmpty,
    items,
    cartTotal,
    totalItems,
    addItem,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();

  // Add item dengan validation
  const addToCart = (product) => {
    if (!product.id || !product.title || !product.price) {
      console.error('Product data incomplete');
      return false;
    }
    
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image_url || product.image ||'https://via.placeholder.com/400x400?text=No+Image',
    });
    return true;
  };

  // Update quantity dengan validation
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  return {
    isEmpty,
    items,
    cartTotal,
    totalItems,
    addToCart,
    updateQuantity,
    removeItem,
    emptyCart
  };
};