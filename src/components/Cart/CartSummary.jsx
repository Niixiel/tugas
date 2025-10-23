import React from "react";
import { useCartOperations } from "../../hooks/useCartOperations";
import { CART_CONFIG, formatPrice } from "../../constants/cartConstants";

const CartSummary = () => {
  const { items, cartTotal, totalItems } = useCartOperations();

  return (
    <div className="bg-white p-4 rounded border shadow-sm mb-4">
      <h3 className="font-semibold mb-3">{CART_CONFIG.MESSAGES.ORDER_SUMMARY}</h3>
      
      {items.map((item) => (
        <div key={item.id} className="flex justify-between py-1 border-b last:border-b-0">
          <span>{item.title} {item.quantity}</span>
          <span>{formatPrice(item.price * item.quantity)}</span>
        </div>
      ))}
      
      <div className="flex justify-between pt-3 font-semibold">
        <span>Total ({totalItems} item):</span>
        <span className="text-green-600">
          {formatPrice(cartTotal)}
        </span>
      </div>
    </div>
  );
};

export default CartSummary;