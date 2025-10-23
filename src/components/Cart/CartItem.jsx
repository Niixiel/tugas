import React from "react";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import { useCartOperations } from "../../hooks/useCartOperations";
import { CART_CONFIG, formatPrice } from "../../constants/cartConstants"; 

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartOperations();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= CART_CONFIG.MIN_QUANTITY && newQuantity <= CART_CONFIG.MAX_QUANTITY) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
    console.log(CART_CONFIG.MESSAGES.ITEM_REMOVED);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="bg-white p-4 rounded border shadow-sm mb-3">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 rounded object-cover"
        />
        
        <div className="flex-1">
          <h4 className="font-semibold">{item.title}</h4>
          <p className="text-sm text-gray-600">
            {formatPrice(item.price)}
          </p>
          
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= CART_CONFIG.MIN_QUANTITY}
              className="w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center"
            >
              <MdRemove size={16} />
            </button>
            
            <span className="w-8 text-center">{item.quantity}</span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= CART_CONFIG.MAX_QUANTITY}
              className="w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center"
            >
              <MdAdd size={16} />
            </button>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-bold text-green-600">
            {formatPrice(itemTotal)}
          </p>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 mt-2"
          >
            <MdDelete size={16} />
            {CART_CONFIG.MESSAGES.DELETE_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;