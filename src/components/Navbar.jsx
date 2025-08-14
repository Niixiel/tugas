import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoIosContact } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useCart } from "../Context/CartContext";

// Objek konstanta untuk data navigasi agar mudah diubah dan dikelola
const CONTENT = {
  brand: "Tugas",
  navLinks: [
    { name: "Beranda", path: "/" },
    { name: "Menu", path: "/products" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Kontak", path: "/contact" },
    { name: "Testimoni", path: "/testimonial" },
    { name: "exApi", path: "/exApi" }
  ],
  icons: [
    { Icon: FiSearch, ariaLabel: "Pencarian" },
    { Icon: IoIosContact, ariaLabel: "Kontak" },
    { Icon: FaShoppingCart, ariaLabel: "Keranjang Belanja", to: "/cart" },
  ],
  shopButton: "Menu",
};

// Komponen untuk tautan navigasi
const NavLinks = ({ isMobile = false, onLinkClick }) => {
  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler untuk klik link
  const handleLinkClick = () => {
    scrollToTop();
    if (isMobile && onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <>
      {CONTENT.navLinks.map(({ name, path }) => (
        <Link
          key={name}
          to={path}
          className="text-gray-700 hover:text-green-600 transition duration-300"
          onClick={handleLinkClick}
        >
          {name}
        </Link>
      ))}
    </>
  );
};

// Komponen untuk ikon-ikon aksi
const ActionIcons = ({ cartCount }) => {
  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex gap-4">
      {CONTENT.icons.map(({ Icon, ariaLabel, to }, index) => (
        <Link
          key={index}
          to={to || "#"}
          className="p-2 rounded-full hover:bg-green-500 hover:text-white cursor-pointer transition duration-300 relative"
          aria-label={ariaLabel}
          onClick={to ? scrollToTop : undefined}
        >
          <Icon />
          {ariaLabel === "Keranjang Belanja" && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

// Komponen utama Navbar
const Navbar = () => {
  // State untuk mengontrol menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  // Fungsi untuk toggle menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
     <header className="bg-[#c4dbce] flex justify-between items-center px-5 py-5 lg:px-14 md:px-10 relative z-50">
      {/* Logo */}
      <div>
        <Link 
          to="/" 
          className="text-xl font-bold text-gray-800"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {CONTENT.brand}
        </Link>
      </div>

      {/* Menu untuk desktop */}
      <nav className="hidden md:flex items-center gap-6">
        <NavLinks />
        <div className="hidden lg:flex ml-8">
          <ActionIcons cartCount={getCartCount()} />
        </div>
      </nav>

      {/* Ikon burger dan tombol Belanja untuk mobile */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-700"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          {isMenuOpen ? <IoClose /> : <HiMenuAlt3 />}
        </button>
        <Link
          to="/products"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full shadow-lg transition duration-300"
          aria-label={CONTENT.shopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {CONTENT.shopButton}
        </Link>
      </div>

      {/* Menu mobile (dropdown) */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-[#c4dbce] flex flex-col items-center gap-4 py-4 z-50 shadow-lg">
          <NavLinks isMobile={true} onLinkClick={toggleMenu} />
          <ActionIcons cartCount={getCartCount()} />
        </nav>
      )}
    </header>
  );
};

export default Navbar;