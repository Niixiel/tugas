import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../layouts/ProductCard";
import products from "../data/productData";

// Objek konstanta untuk data dan teks agar mudah diubah dan dikelola
const CONTENT = {
  categories: ["Makanan", "Kopi", "Desert"],
  titles: {
    fullPage: "Menu Kami",
    section: "Produk Kami",
  },
  backLinkText: "← Kembali ke Beranda",
};

// Komponen untuk tab kategori
const CategoryTabs = ({ selectedCategory, setSelectedCategory }) => (
  <div className="flex flex-wrap justify-center mb-6 space-x-4 text-sm font-medium text-green-600">
    {CONTENT.categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`pb-1 border-b-2 ${
          selectedCategory === cat ? "border-green-600" : "border-transparent"
        } hover:border-green-400 transition duration-300`}
        aria-label={`Pilih kategori ${cat}`}
      >
        {cat}
      </button>
    ))}
  </div>
);

// Komponen untuk daftar produk
const ProductList = ({ filteredProducts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredProducts.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </div>
);

// Komponen untuk tautan kembali
const BackLink = () => (
  <div className="text-center mt-10">
    <Link
      to="/"
      className="text-green-600 hover:underline text-sm font-medium"
      aria-label={CONTENT.backLinkText}
    >
      {CONTENT.backLinkText}
    </Link>
  </div>
);

// Komponen utama Products
const Products = ({ isFullPage = false }) => {
  // State untuk kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState(CONTENT.categories[0]);

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <section
      className={`bg-gray-50 py-16 px-5 lg:px-14 ${
        isFullPage ? "min-h-screen pt-20" : ""
      }`}
    >
      {/* Kontainer untuk layout responsif */}
      <div className="container mx-auto">
        {/* Judul utama */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          {isFullPage ? CONTENT.titles.fullPage : CONTENT.titles.section}
        </h2>
        {/* Tab kategori */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/* Daftar produk */}
        <ProductList filteredProducts={filteredProducts} />
        {/* Tautan kembali hanya ditampilkan jika isFullPage true */}
        {isFullPage && <BackLink />}
      </div>
    </section>
  );
};

export default Products;