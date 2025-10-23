import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartOperations } from '../hooks/useCartOperations';
import { CART_CONFIG } from '../constants/cartConstants';
    
export default function ExApi() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/products")
            .then((response) => {
                console.log("API Response:", response.data);
                
                let productsData = [];
                
                if (Array.isArray(response.data)) {
                    productsData = response.data;
                } else if (response.data && Array.isArray(response.data.data)) {
                    productsData = response.data.data;
                } else if (response.data && Array.isArray(response.data.products)) {
                    productsData = response.data.products;
                } else {
                    console.error("Format data tidak sesuai:", response.data);
                }
                
                setData(productsData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const categories = ['all', ...(Array.isArray(data) ? new Set(data.map(item => item.category)) : [])];

    const filteredData = selectedCategory === 'all'
        ? data
        : data.filter(item => item.category === selectedCategory);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat produk...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="text-center py-20">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Terjadi Kesalahan</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="text-center py-20">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Produk</h3>
                <p className="text-gray-500">Belum ada produk yang tersedia saat ini.</p>
            </div>
        );
    }

    return (
        <section className="bg-gray-50 py-16 px-5 lg:px-14">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Koleksi Hari Ini
                </h2>
                <p className="text-center mb-8 text-gray-600">
                    Selamat datang di <strong>Toko Kami</strong>!
                </p>
                
                <div className="flex flex-wrap justify-center mb-8 gap-4">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                                selectedCategory === cat 
                                    ? 'bg-green-600 text-white shadow-md' 
                                    : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
                            }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {filteredData.length > 0 ? (
                    <Menu menuData={filteredData} />
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Tidak ada produk dalam kategori ini.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export const Menu = ({ menuData }) => {
    const { addToCart } = useCartOperations();

    if (!Array.isArray(menuData) || menuData.length === 0) {
        return null;
    }

    const getImageUrl = (item) => {
        // Gunakan image_url jika ada, fallback ke image
        return item.image_url || item.image || 'https://via.placeholder.com/400x400?text=No+Image';
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuData.map(item => {
                const imageUrl = getImageUrl(item);
                
                console.log("Product:", item.title, "| Image URL:", imageUrl);
                
                return (
                    <div 
                        key={item.id} 
                        className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100 h-40 flex items-center justify-center">
                            <img 
                                src={imageUrl}
                                alt={item.title} 
                                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" 
                                onError={(e) => {
                                    console.error("Failed to load:", imageUrl);
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/400x400/e5e7eb/6b7280?text=Image+Not+Available';
                                }}
                                onLoad={() => {
                                    console.log("Image loaded successfully:", imageUrl);
                                }}
                            />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {item.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-green-600 text-xl">
                                {CART_CONFIG.CURRENCY} {parseFloat(item.price).toLocaleString(CART_CONFIG.LOCALE)}
                            </p>
                            <span className="text-sm text-gray-500">
                                Stock: {item.stock}
                            </span>
                        </div>
                        <button
                            onClick={() => addToCart(item)}
                            disabled={item.stock === 0}
                            className={`w-full py-2 px-4 rounded-lg transition-all duration-200 font-medium ${
                                item.stock === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                            }`}
                        >
                            {item.stock === 0 ? 'Stok Habis' : CART_CONFIG.MESSAGES.ADD_TO_CART}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};