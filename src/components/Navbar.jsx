import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-600" onClick={closeMenu}>
            Tugas
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition duration-300">
              Beranda
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600 transition duration-300">
              Menu
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition duration-300">
              Tentang
            </Link>
            <Link to="/testimonial" className="text-gray-700 hover:text-green-600 transition duration-300">
              Testimoni
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition duration-300">
              Kontak
            </Link>
            <Link to="/exApi" className="text-gray-700 hover:text-green-600 transition duration-300">
              FakeStore
            </Link>
          </div>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-700 hover:text-green-600 transition duration-300">
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-green-600 transition duration-300"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pb-4`}>
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-green-600 transition duration-300 py-2 px-4 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              Beranda
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-green-600 transition duration-300 py-2 px-4 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              Menu
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-green-600 transition duration-300 py-2 px-4 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              Tentang
            </Link>
            <Link 
              to="/testimonial" 
              className="text-gray-700 hover:text-green-600 transition duration-300 py-2 px-4 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              Testimoni
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-green-600 transition duration-300 py-2 px-4 rounded hover:bg-gray-100"
              onClick={closeMenu}
            >
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;