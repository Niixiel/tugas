import React from "react";
import { useCartOperations } from "../hooks/useCartOperations";
import { CART_CONFIG, formatPrice } from "../constants/cartConstants"; 

const ProductCard = ({ image, title, price, oldPrice, discount, status, id }) => {
  const { addToCart } = useCartOperations();

  const handleAddToCart = () => {
    const success = addToCart({ id, title, price, image });
    if (success) {
      console.log(CART_CONFIG.MESSAGES.ITEM_ADDED);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300 relative overflow-hidden">
      {discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          -{discount}%
        </div>
      )}

      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded"
        loading="lazy"
      />

      <h3 className="text-lg font-semibold mt-4 text-center">{title}</h3>

      <div className="mt-2 text-center">
        <span className="text-green-600 font-bold">
          {formatPrice(price)}
        </span>
        {oldPrice && (
          <span className="text-gray-500 line-through ml-2">
            {formatPrice(oldPrice)}
          </span>
        )}
      </div>

      {status === "soldout" ? (
        <p className="text-red-600 font-semibold mt-5 text-center">
          {CART_CONFIG.MESSAGES.SOLD_OUT}
        </p>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm font-medium transition duration-300"
        >
          {CART_CONFIG.MESSAGES.ADD_TO_CART}
        </button>
      )}
    </div>
  );
};

export default ProductCard;