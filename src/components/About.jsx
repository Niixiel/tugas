import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/img/about.jpg";

// Objek konstanta untuk teks konten agar mudah diubah dan dikelola
const CONTENT = {
  title: "Tentang Kami",
  subtitle: "Kami Peduli Kualitas",
  description1:
    "Di restoran kami, percaya bahwa makanan yang baik berasal dari bahan-bahan berkualitas.",
  description2:
    "Kami memilih petani yang menerapkan praktik alami — tanpa bahan kimia, tanpa jalan pintas.",
  backLinkText: "← Kembali ke Beranda",
};

// Komponen untuk menampilkan konten teks
const TextContent = () => (
  <div className="lg:w-1/2 space-y-4">
    {/* Judul utama */}
    <h2 className="text-3xl font-bold text-gray-800">{CONTENT.title}</h2>
    {/* Subjudul */}
    <p className="text-green-600 font-semibold">{CONTENT.subtitle}</p>
    {/* Paragraf deskripsi */}
    <p className="text-gray-600">{CONTENT.description1}</p>
    <p className="text-gray-600">{CONTENT.description2}</p>
  </div>
);

// Komponen untuk menampilkan gambar
const ImageContent = () => (
  <div className="lg:w-1/2">
    <img
      src={img}
      alt="Peternakan Kami"
      className="w-full h-auto rounded-lg shadow-lg object-cover"
      loading="lazy"
    />
  </div>
);

// Komponen untuk tautan kembali ke beranda
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

// Komponen utama About
const About = ({ isFullPage = false }) => {
  return (
    <section
      className={`bg-white py-16 px-5 lg:px-20 ${
        isFullPage ? "min-h-screen pt-20" : ""
      }`}
    >
      {/* Kontainer untuk layout responsif */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        <TextContent />
        <ImageContent />
      </div>
      {/* Tampilkan tautan kembali hanya jika isFullPage bernilai true */}
      {isFullPage && <BackLink />}
    </section>
  );
};

export default About;