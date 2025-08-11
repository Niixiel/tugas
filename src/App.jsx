import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext"; 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Cart from "./components/Cart";

// Konfigurasi rute untuk memudahkan pemeliharaan
const routes = [
  {
    path: "/",
    components: [
      { Component: Hero, key: "hero", props: {} },
      { Component: Products, key: "products", props: {} },
      { Component: About, key: "about", props: {} },
      { Component: Contact, key: "contact", props: {} },
      { Component: Testimonial, key: "testimonial", props: {} },
      { Component: Footer, key: "footer", props: {} },
    ],
  },
  {
    path: "/products",
    components: [
      { Component: Products, key: "products", props: { isFullPage: true } },
      { Component: Footer, key: "footer", props: {} },
    ],
  },
  {
    path: "/about",
    components: [
      { Component: About, key: "about", props: { isFullPage: true } },
      { Component: Footer, key: "footer", props: {} },
    ],
  },
  {
    path: "/testimonial",
    components: [
      { Component: Testimonial, key: "testimonial", props: { isFullPage: true } },
      { Component: Footer, key: "footer", props: {} },
    ],
  },
  {
    path: "/contact",
    components: [
      { Component: Contact, key: "contact", props: { isFullPage: true } },
      { Component: Footer, key: "footer", props: {} },
    ],
  },
  {
    path: "/cart",
    components: [
      { Component: Cart, key: "cart", props: {} },
      { Component: Footer, key: "footer", props: {} },
    ],
  },
];

// Komponen utama App
const App = () => {
  return (
    <CartProvider>
      <Router>
        {/* Navbar ditampilkan di setiap halaman */}
        <Navbar />
        <Routes>
          {/* Mapping rute dari konfigurasi */}
          {routes.map(({ path, components }) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  {components.map(({ Component, key, props }) => (
                    <Component key={key} {...props} />
                  ))}
                </>
              }
            />
          ))}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;