import React from "react";
import { useCart } from "../Context/CartContext";

// Objek konstanta untuk teks agar mudah diubah dan dikelola
const CONTENT = {
  discountLabel: (discount) => `-${discount}%`,
  soldOutText: "Habis Terjual",
  addToCartText: "Tambah ke Keranjang",
  currency: "Rp",
};

// Komponen untuk badge diskon
const DiscountBadge = ({ discount }) => (
  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
    {CONTENT.discountLabel(discount)}
  </div>
);

// Komponen untuk harga produk
const PriceDisplay = ({ price, oldPrice }) => (
  <div className="mt-2 text-center">
    <span className="text-green-600 font-bold">
      {CONTENT.currency} {price.toLocaleString("id-ID")}
    </span>
    {oldPrice && (
      <span className="text-gray-500 line-through ml-2">
        {CONTENT.currency} {oldPrice.toLocaleString("id-ID")}
      </span>
    )}
  </div>
);

// Komponen utama ProductCard
const ProductCard = ({ image, title, price, oldPrice, discount, status, id }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300 relative overflow-hidden">
      {/* Badge diskon (jika ada) */}
      {discount && <DiscountBadge discount={discount} />}

      {/* Gambar produk */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded"
        loading="lazy"
      />

      {/* Judul produk */}
      <h3 className="text-lg font-semibold mt-4 text-center">{title}</h3>

      {/* Harga produk */}
      <PriceDisplay price={price} oldPrice={oldPrice} />

      {/* Status produk atau tombol tambah ke keranjang */}
      {status === "soldout" ? (
        <p className="text-red-600 font-semibold mt-5 text-center">
          {CONTENT.soldOutText}
        </p>
      ) : (
        <button
          onClick={() => addToCart({ id, image, title, price })}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm font-medium transition duration-300"
          aria-label={CONTENT.addToCartText}
        >
          {CONTENT.addToCartText}
        </button>
      )}
    </div>
  );
};

export default ProductCard;