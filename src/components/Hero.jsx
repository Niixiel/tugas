import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/img/hero.jpeg";

// ====================================
// CONTENT CONSTANTS
// ====================================
const CONTENT = {
  subtitle: "Restoran terbaik untuk Anda!",
  title: "Selamat Menikmati Hidangan",
  description:
    "Nikmati hidangan segar dan sehat dari bahan-bahan organik pilihan, langsung dari petani lokal.",
  buttonText: "Jelajahi Menu",
  altText: "Hidangan Organik Segar dan Sehat",
};

// ====================================
// HERO COMPONENTS
// ====================================

/**
 * Komponen untuk bagian konten teks hero
 */
const HeroTextContent = () => (
  <div className="text-center mt-12 md:text-start md:mt-0 space-y-5 max-w-xl">
    {/* Subtitle */}
    <h3 className="text-sm md:text-lg text-gray-700">
      {CONTENT.subtitle}
    </h3>
    
    {/* Main Title */}
    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
      {CONTENT.title}
    </h1>
    
    {/* Description */}
    <p className="text-gray-600 text-md">
      {CONTENT.description}
    </p>
    
    {/* CTA Button */}
    <Link
      to="/products"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full shadow-lg transition duration-300"
      aria-label={CONTENT.buttonText}
    >
      {CONTENT.buttonText}
    </Link>
  </div>
);

/**
 * Komponen untuk bagian gambar hero dengan ukuran yang lebih besar
 */
const HeroImageContent = () => (
  <div className="w-full md:w-1/2">
    <img
      src={img}
      alt={CONTENT.altText}
      className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] border-2 border-white object-cover"
      loading="lazy"
    />
  </div>
);

// ====================================
// MAIN HERO COMPONENT
// ====================================

/**
 * Komponen utama Hero dengan ukuran gambar yang diperbesar
 */
const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col-reverse md:flex-row justify-center md:justify-between items-center px-5 lg:px-14 bg-gradient-to-r from-[#d7e8dc] to-[#c4dbce]">
      {/* Kontainer untuk layout responsif */}
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <HeroTextContent />
        <HeroImageContent />
      </div>
    </section>
  );
};

export default Hero;