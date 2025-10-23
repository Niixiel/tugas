import React from "react";
import { Link } from "react-router-dom";
import { useCartOperations } from "../hooks/useCartOperations";
import CartSummary from "./Cart/CartSummary"; 
import CartItem from "./Cart/cartItem";
import CheckoutForm from "./Cart/CheckoutForm"; 
import { CART_CONFIG } from "../constants/cartConstants"; 

const Cart = () => {
  const { isEmpty, items, emptyCart } = useCartOperations();

  const handleCheckout = async (orderData) => {
    // Implement checkout logic here
    console.log("Checkout data:", orderData);
  };

  if (isEmpty) {
    return (
      <section className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">{CART_CONFIG.MESSAGES.SHOPPING_CART}</h1>
          <div className="py-10">
            <h3 className="text-2xl font-semibold mb-3">
              {CART_CONFIG.MESSAGES.EMPTY_CART}
            </h3>
            <Link 
              to="/products" 
              className="bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors"
            >
              {CART_CONFIG.MESSAGES.START_SHOPPING}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {CART_CONFIG.MESSAGES.SHOPPING_CART}
        </h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div>
            <CartSummary />
            <CheckoutForm onSubmit={handleCheckout} />
            <button
              onClick={emptyCart}
              className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-colors mt-4"
            >
              {CART_CONFIG.MESSAGES.EMPTY_CART_BUTTON}
            </button>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <Link 
            to="/products" 
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            {CART_CONFIG.MESSAGES.BACK_TO_MENU}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;