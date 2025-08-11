import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Objek konstanta untuk data dan teks agar mudah diubah dan dikelola
const CONTENT = {
  title: "Apa Kata Pelanggan Kami",
  backLinkText: "← Kembali ke Beranda",
  testimonials: [
    {
      id: "1",
      name: "Oliver Bennett",
      comment: "Enak!",
      img: "src/assets/img/review1.jpg",
    },
    {
      id: "2",
      name: "Amelia Brooks",
      comment: "Ramen yang lezat dan mengenyangkan!",
      img: "src/assets/img/review2.jpg",
    },
    {
      id: "3",
      name: "Charlotte Harris",
      comment: "Makanan yang luar biasa!",
      img: "src/assets/img/review3.jpg",
    },
    {
      id: "4",
      name: "James Walker",
      comment: "Makanan yang sangat lezat dan berkualitas tinggi!",
      img: "src/assets/img/review4.jpg",
    },
  ],
};

// Pengaturan untuk slider react-slick
const SLIDER_SETTINGS = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  arrows: false,
  dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        centerPadding: "20px",
      },
    },
  ],
};

// Komponen untuk kartu testimoni
const TestimonialCard = ({ name, comment, img }) => (
  <div className="px-4 mb-2">
    <div className="bg-green-50 p-6 rounded-lg shadow-md text-center h-full">
      <img
        src={img}
        alt={`Foto ${name}`}
        className="w-40 h-36 mx-auto rounded-full mb-5 object-cover"
        loading="lazy"
      />
      <p className="text-gray-700 italic mb-2">"{comment}"</p>
      <h4 className="font-semibold text-green-700">{name}</h4>
    </div>
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

// Komponen utama Testimonial
const Testimonial = ({ isFullPage = false }) => {
  return (
    <section
      className={`bg-white py-16 px-5 lg:px-14 ${
        isFullPage ? "min-h-screen pt-20" : ""
      }`}
    >
      {/* Kontainer untuk layout responsif */}
      <div className="container mx-auto">
        {/* Judul utama */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          {CONTENT.title}
        </h2>
        {/* Slider untuk testimoni */}
        <div className="max-w-6xl mx-auto">
          <Slider {...SLIDER_SETTINGS}>
            {CONTENT.testimonials.map(({ id, name, comment, img }) => (
              <TestimonialCard key={id} name={name} comment={comment} img={img} />
            ))}
          </Slider>
        </div>
        {/* Tautan kembali hanya ditampilkan jika isFullPage true */}
        {isFullPage && <BackLink />}
      </div>
    </section>
  );
};

export default Testimonial;