import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

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
};

// Komponen untuk menampilkan item keranjang
const CartItem = ({ item, onRemove }) => (
  <div className="flex justify-between items-center py-4 border-b">
    <div className="flex items-center gap-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
      />
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
        <p className="text-sm text-gray-600">
          {CONTENT.quantityLabel}: {item.quantity}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-green-600 font-bold">
        {CONTENT.currency} {(item.price * item.quantity).toLocaleString("id-ID")}
      </p>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-600 text-sm hover:underline"
        aria-label={`Hapus ${item.title} dari keranjang`}
      >
        Hapus
      </button>
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
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
    {/* Input nama pemesan */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          {CONTENT.nameLabel}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder={CONTENT.namePlaceholder}
          aria-label={CONTENT.nameLabel}
        />
      </div>
      
      {/* Input nomor HP */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          {CONTENT.phoneLabel}
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder={CONTENT.phonePlaceholder}
          aria-label={CONTENT.phoneLabel}
        />
      </div>

      {/* Pilihan tipe pesanan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipe Pesanan
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="orderType"
              value="takeaway"
              checked={orderType === "takeaway"}
              onChange={() => setOrderType("takeaway")}
              className="text-green-600 focus:ring-green-600"
            />
            {CONTENT.takeaway}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="orderType"
              value="dinein"
              checked={orderType === "dinein"}
              onChange={() => setOrderType("dinein")}
              className="text-green-600 focus:ring-green-600"
            />
            {CONTENT.dineIn}
          </label>
        </div>
      </div>

      {/* Input nomor meja (hanya untuk dine-in) */}
      {orderType === "dinein" && (
        <div>
          <label
            htmlFor="tableNumber"
            className="block text-sm font-medium text-gray-700"
          >
            {CONTENT.tableLabel}
          </label>
          <input
            type="text"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required={orderType === "dinein"}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder={CONTENT.tablePlaceholder}
            aria-label={CONTENT.tableLabel}
          />
        </div>
      )}

      {/* Input catatan */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          {CONTENT.notesLabel}
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder={CONTENT.notesPlaceholder}
          aria-label={CONTENT.notesLabel}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300"
        aria-label={CONTENT.checkoutButton}
      >
        {CONTENT.checkoutButton}
      </button>
    </form>
  );
};

// Komponen utama Cart
const Cart = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  const handleCheckout = ({ orderType, tableNumber, notes }) => {
    console.log("Checkout:", {
      items: cartItems,
      orderType,
      tableNumber,
      notes,
      totalPrice: getTotalPrice(),
    }); // Ganti dengan panggilan API di produksi
  };

  return (
    <section className="bg-gray-50 py-16 px-5 lg:px-14 min-h-screen pt-20">
      <div className="container mx-auto">
        {/* Judul utama */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          {CONTENT.title}
        </h2>

        {/* Daftar item keranjang */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">{CONTENT.emptyCart}</p>
        ) : (
          <div className="max-w-3xl mx-auto">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
              />
            ))}
            <div className="text-right mt-6">
              <p className="text-lg font-bold text-gray-800">
                {CONTENT.totalLabel}: {CONTENT.currency}{" "}
                {getTotalPrice().toLocaleString("id-ID")}
              </p>
            </div>
            <CheckoutForm onSubmit={handleCheckout} />
          </div>
        )}

        {/* Tautan kembali */}
        <div className="text-center mt-15">
          <Link
            to="/products"
            className="text-green-600 hover:underline text-sm font-medium"
            aria-label={CONTENT.backLinkText}
          >
            {CONTENT.backLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;