import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import PlusMinus from "./plusminus";
import { MdDelete } from "react-icons/md";

// Objek konstanta untuk teks agar mudah diubah dan dikelola
const CONTENT = {
  title: "Keranjang Belanja",
  emptyCart: "Keranjang Anda kosong.",
  checkoutButton: "Checkout",
  dineIn: "Makan di Tempat",
  takeaway: "Bawa Pulang",
  tableLabel: "Nomor Meja",
  tablePlaceholder: "Masukkan nomor meja",
  notesLabel: "Catatan (Opsional)",
  notesPlaceholder: "Masukkan catatan untuk pesanan Anda",
  quantityLabel: "Jumlah",
  priceLabel: "Harga",
  totalLabel: "Total Harga",
  currency: "Rp",
  nameLabel: "Nama Pemesan",
  namePlaceholder: "Masukkan nama Anda",
  phoneLabel: "Nomor HP",
  phonePlaceholder: "Masukkan nomor HP Anda",
  backLinkText: "← Kembali ke Menu",
  itemLabel: "Item",
  subtotalLabel: "Subtotal",
  deleteButton: "Hapus",
};

// Komponen untuk menampilkan item keranjang
const CartItem = ({ item, onRemove, onDecrease, onIncrease }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
    <div className="flex flex-col md:flex-row gap-4">
      {/* Gambar dan info produk */}
      <div className="flex gap-4 flex-1">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
          <p className="text-sm text-gray-600 mb-2">
            {CONTENT.currency} {item.price.toLocaleString("id-ID")} per item
          </p>
          
          {/* Kontrol quantity menggunakan PlusMinus */}
          <PlusMinus
            data={item.quantity}
            setData={(id, newQuantity) => {
              if (newQuantity > item.quantity) onIncrease(id);
              else if (newQuantity < item.quantity) onDecrease(id);
            }}
            id={item.id}
            max="10" // Batas maksimum kuantitas
          />
        </div>
      </div>
      
      {/* Harga dan tombol hapus */}
      <div className="flex flex-col items-end justify-between md:min-w-[120px]">
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">
            {CONTENT.currency} {(item.price * item.quantity).toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-gray-500">
            {item.quantity} × {CONTENT.currency} {item.price.toLocaleString("id-ID")}
          </p>
        </div>
        
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium mt-2 transition duration-200"
          aria-label={`${CONTENT.deleteButton} ${item.title} dari keranjang`}
        >
          <MdDelete size={16} />
          {CONTENT.deleteButton}
        </button>
      </div>
    </div>
  </div>
);

// Komponen untuk ringkasan total
const OrderSummary = ({ cartItems, totalPrice }) => (
  <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100 mb-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan Pesanan</h3>
    
    {cartItems.map((item) => (
      <div key={item.id} className="flex justify-between items-center py-2 border-b border-green-200 last:border-b-0">
        <span className="text-gray-600">
          {item.title} × {item.quantity}
        </span>
        <span className="font-medium">
          {CONTENT.currency} {(item.price * item.quantity).toLocaleString("id-ID")}
        </span>
      </div>
    ))}
    
    <div className="flex justify-between items-center pt-4 mt-4 border-t border-green-200">
      <span className="text-lg font-bold text-gray-800">{CONTENT.totalLabel}:</span>
      <span className="text-xl font-bold text-green-600">
        {CONTENT.currency} {totalPrice.toLocaleString("id-ID")}
      </span>
    </div>
  </div>
);

// Komponen untuk form checkout
const CheckoutForm = ({ onSubmit }) => {
  const [orderType, setOrderType] = useState("takeaway");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ orderType, tableNumber, notes, name, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Input nama pemesan */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          {CONTENT.nameLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder={CONTENT.namePlaceholder}
        />
      </div>
      
      {/* Input nomor HP */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          {CONTENT.phoneLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder={CONTENT.phonePlaceholder}
        />
      </div>

      {/* Pilihan tipe pesanan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tipe Pesanan <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="orderType"
              value="takeaway"
              checked={orderType === "takeaway"}
              onChange={() => setOrderType("takeaway")}
              className="text-green-600 focus:ring-green-500"
            />
            <span className="text-gray-700">{CONTENT.takeaway}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="orderType"
              value="dinein"
              checked={orderType === "dinein"}
              onChange={() => setOrderType("dinein")}
              className="text-green-600 focus:ring-green-500"
            />
            <span className="text-gray-700">{CONTENT.dineIn}</span>
          </label>
        </div>
      </div>

      {/* Input nomor meja (hanya untuk dine-in) */}
      {orderType === "dinein" && (
        <div>
          <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-2">
            {CONTENT.tableLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required={orderType === "dinein"}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={CONTENT.tablePlaceholder}
          />
        </div>
      )}

      {/* Input catatan */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          {CONTENT.notesLabel}
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder={CONTENT.notesPlaceholder}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105"
      >
        {CONTENT.checkoutButton}
      </button>
    </form>
  );
};

// Komponen utama Cart
const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    decreaseQuantity, 
    increaseQuantity, 
    getTotalPrice,
    clearCart 
  } = useCart();

  const handleCheckout = (orderData) => {
    const orderDetails = {
      ...orderData,
      items: cartItems,
      totalPrice: getTotalPrice(),
      orderDate: new Date().toISOString(),
      orderId: `ORD-${Date.now()}`,
    };
    
    console.log("Checkout Order:", orderDetails);
    
    // Simulasi sukses checkout
    alert("Pesanan berhasil dibuat! Terima kasih telah berbelanja.");
    clearCart();
  };

  return (
    <section className="bg-gray-50 min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-5 lg:px-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{CONTENT.title}</h1>
          <p className="text-gray-600">
            {cartItems.length > 0 
              ? `${cartItems.length} jenis item dalam keranjang` 
              : "Keranjang belanja Anda"
            }
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Keranjang kosong */
          <div className="text-center py-16">
            <div className="mb-8">
              <svg 
                className="mx-auto h-24 w-24 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7M7 13l-1.5 7m0 0h9" 
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{CONTENT.emptyCart}</h3>
            <p className="text-gray-600 mb-8">Tambahkan beberapa item ke keranjang Anda untuk melanjutkan.</p>
            <Link
              to="/products"
              className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          /* Konten keranjang */
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Daftar item keranjang */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Daftar Item ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
                </h2>
                
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                    onDecrease={decreaseQuantity}
                    onIncrease={increaseQuantity}
                  />
                ))}
              </div>
              
              {/* Ringkasan dan checkout */}
              <div className="lg:col-span-1">
                <OrderSummary cartItems={cartItems} totalPrice={getTotalPrice()} />
                <CheckoutForm onSubmit={handleCheckout} />
              </div>
            </div>
          </div>
        )}

        {/* Link kembali */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline transition duration-200"
          >
            {CONTENT.backLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;