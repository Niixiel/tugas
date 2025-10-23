import React, { useState } from "react";
import { CART_CONFIG } from "../../constants/cartConstants";

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    orderType: "takeaway",
    tableNumber: "",
    notes: "",
    name: "",
    phone: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.name && formData.phone && 
    (formData.orderType === "takeaway" || formData.tableNumber);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Informasi Pemesan */}
      <div className="bg-white p-4 rounded border">
        <h4 className="font-semibold mb-3">Informasi Pemesan</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Nama *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan nama"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Nomor HP *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan nomor HP"
            />
          </div>
        </div>
      </div>

      {/* Tipe Pesanan */}
      <div className="bg-white p-4 rounded border">
        <h4 className="font-semibold mb-3">Tipe Pesanan</h4>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { value: "takeaway", label: "Bawa Pulang" },
            { value: "dinein", label: "Makan di Tempat" },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 p-2 border rounded cursor-pointer">
              <input
                type="radio"
                name="orderType"
                value={value}
                checked={formData.orderType === value}
                onChange={(e) => handleInputChange("orderType", e.target.value)}
              />
              {label}
            </label>
          ))}
        </div>
        
        {formData.orderType === "dinein" && (
          <div>
            <label className="block text-sm mb-1">Nomor Meja *</label>
            <input
              type="text"
              value={formData.tableNumber}
              onChange={(e) => handleInputChange("tableNumber", e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan nomor meja"
            />
          </div>
        )}
      </div>

      {/* Catatan */}
      <div className="bg-white p-4 rounded border">
        <label className="block text-sm mb-1">Catatan (Opsional)</label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          rows="3"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Masukkan catatan"
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:bg-gray-400 transition duration-300"
      >
        Checkout
      </button>
    </form>
  );
};

export default CheckoutForm;