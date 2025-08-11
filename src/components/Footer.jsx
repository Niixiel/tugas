import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

// Objek konstanta untuk data footer agar mudah diubah dan dikelola
const CONTENT = {
  logo: {
    title: "Tugas",
    description:
      "Menyediakan tempat makan ter enak",
  },
  quickLinks: {
    title: "Tautan Cepat",
    links: [
      { name: "Beranda", path: "/" },
      { name: "Tentang Kami", path: "/about" },
      { name: "Produk", path: "/products" },
      { name: "Kontak", path: "/contact" },
    ],
  },
  categories: {
    title: "Kategori",
    items: ["Makanan", "Kopi", "Desert"],
  },
  contact: {
    title: "Kontak",
    address: "123 Tugas Street, London, UK",
    email: "Loreipsum@example.com",
    phone: "+44 123 456 7890",
    socials: [
      { Icon: FaFacebookF, href: "/", ariaLabel: "Facebook" },
      { Icon: FaInstagram, href: "/", ariaLabel: "Instagram" },
      { Icon: FaTwitter, href: "/", ariaLabel: "Twitter" },
    ],
  },
  copyright: "@hak cipta Tugas",
};

// Komponen untuk bagian Logo dan deskripsi
const LogoSection = () => (
  <div className="space-y-3">
    <h3 className="text-2xl font-bold text-green-700">{CONTENT.logo.title}</h3>
    <p className="text-sm text-gray-600">{CONTENT.logo.description}</p>
  </div>
);

// Komponen untuk bagian Tautan Cepat
const QuickLinks = () => (
  <div className="space-y-3">
    <h4 className="font-semibold text-green-700">{CONTENT.quickLinks.title}</h4>
    <ul className="space-y-2 text-sm">
      {CONTENT.quickLinks.links.map(({ name, path }) => (
        <li key={name}>
          <Link to={path} className="hover:text-green-600 transition duration-300">
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Komponen untuk bagian Kategori
const Categories = () => (
  <div className="space-y-3">
    <h4 className="font-semibold text-green-700">{CONTENT.categories.title}</h4>
    <ul className="space-y-2 text-sm">
      {CONTENT.categories.items.map((category) => (
        <li key={category}>
          <Link to="/" className="hover:text-green-600 transition duration-300">
            {category}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Komponen untuk bagian Kontak dan Media Sosial
const ContactSection = () => (
  <div className="space-y-3">
    <h4 className="font-semibold text-green-700">{CONTENT.contact.title}</h4>
    <p className="text-sm text-gray-600">{CONTENT.contact.address}</p>
    <p className="text-sm text-gray-600">Email: {CONTENT.contact.email}</p>
    <p className="text-sm text-gray-600 mb-4">Telepon: {CONTENT.contact.phone}</p>
    <div className="flex space-x-4">
      {CONTENT.contact.socials.map(({ Icon, href, ariaLabel }, index) => (
        <a
          key={index}
          href={href}
          className="text-green-700 hover:text-green-900 transition duration-300"
          aria-label={ariaLabel}
        >
          <Icon />
        </a>
      ))}
    </div>
  </div>
);

// Komponen untuk bagian Hak Cipta
const Copyright = () => (
  <div className="text-center text-sm text-gray-500 border-t pt-4">
    {CONTENT.copyright}
  </div>
);

// Komponen utama Footer
const Footer = () => {
  return (
    <footer className="bg-green-100 text-gray-800 pt-12 pb-6 px-5 lg:px-14">
      {/* Kontainer untuk layout grid responsif */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <LogoSection />
        <QuickLinks />
        <Categories />
        <ContactSection />
      </div>
      {/* Bagian hak cipta di bawah */}
      <Copyright />
    </footer>
  );
};

export default Footer;