import React, { useState } from "react";
import { Link } from "react-router-dom";

// Objek konstanta untuk teks konten agar mudah diubah dan dikelola
const CONTENT = {
  title: "Hubungi Kami",
  description:
    "Punya pertanyaan, masukan, atau ingin membuat reservasi? Isi formulir di bawah ini, dan kami akan segera menghubungi Anda!",
  successMessage: "Terima kasih! Pesan atau reservasi Anda telah terkirim.",
  backLinkText: "← Kembali ke Beranda",
  formFields: {
    name: {
      label: "Nama",
      placeholder: "Nama Anda",
      type: "text",
      required: true,
    },
    email: {
      label: "Email",
      placeholder: "Email Anda",
      type: "email",
      required: true,
    },
    reservationDate: {
      label: "Tanggal Reservasi (Opsional)",
      type: "date",
      required: false,
    },
    message: {
      label: "Pesan atau Masukan",
      placeholder: "Pesan atau detail reservasi Anda",
      type: "textarea",
      required: true,
    },
  },
};

// Komponen untuk input formulir (input atau textarea)
const FormInput = ({ id, name, type, label, placeholder, value, onChange, required }) => (
  <div className="space-y-1">
    {/* Label untuk input */}
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows="4"
        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        placeholder={placeholder}
        aria-label={label}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        placeholder={placeholder}
        aria-label={label}
      />
    )}
  </div>
);

// Komponen untuk pesan sukses setelah pengiriman formulir
const SuccessMessage = ({ message }) => (
  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
    {message}
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

// Komponen utama Contact
const Contact = ({ isFullPage = false }) => {
  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    reservationDate: "",
  });
  // State untuk menampilkan pesan sukses
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulir dikirim:", formData); // Ganti dengan panggilan API di produksi
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "", reservationDate: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      className={`bg-green-50 py-16 px-5 lg:px-20 ${
        isFullPage ? "min-h-screen pt-20" : ""
      }`}
    >
      {/* Kontainer untuk layout responsif */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Placeholder untuk kolom kosong (opsional untuk gambar di masa depan) */}
        <div className="lg:w-1/2"></div>
        {/* Formulir dan konten */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{CONTENT.title}</h2>
          <p className="text-gray-600 mb-6">{CONTENT.description}</p>
          {isSubmitted && <SuccessMessage message={CONTENT.successMessage} />}
          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.entries(CONTENT.formFields).map(([name, { label, placeholder, type, required }]) => (
              <FormInput
                key={name}
                id={name}
                name={name}
                type={type}
                label={label}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={required}
              />
            ))}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300"
              aria-label="Kirim Formulir"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
      {/* Tampilkan tautan kembali jika isFullPage bernilai true */}
      {isFullPage && <BackLink />}
    </section>
  );
};

export default Contact;