import React from 'react';
import PropTypes from 'prop-types';

// Objek konstanta untuk teks agar konsisten dengan komponen lain
const CONTENT = {
  quantityLabel: "Jumlah",
  soldOutText: "Stok Habis",
};

export default function PlusMinus({ data, setData, id, max }) {
  const increment = () => {
    if (data < max) {
      setData(id, data + 1);
    }
  };

  const decrement = () => {
    if (data > 1) {
      setData(id, data - 1);
    }
  };

  return (
    <div className="flex items-center justify-between mt-4 mb-4">
      <span className="text-gray-900 font-bold text-lg pl-5">{CONTENT.quantityLabel}</span>
      {max !== 0 ? (
        <div className="border border-gray-300 rounded-md w-fit m-auto">
          <button
            onClick={increment}
            className="pr-2 pl-2 p-1 duration-300 hover:bg-gray-200 text-gray-600 rounded-l-md disabled:opacity-50"
            aria-label="Tambah jumlah"
            disabled={data >= max}
          >
            +
          </button>
          <span className="pr-3 pl-3 p-1 text-gray-800">{data}</span>
          <button
            onClick={decrement}
            className="pr-2 pl-2 p-1 duration-300 hover:bg-gray-200 text-gray-600 rounded-r-md disabled:opacity-50"
            aria-label="Kurangi jumlah"
            disabled={data <= 1}
          >
            -
          </button>
        </div>
      ) : (
        <p className="text-red-500 font-medium">{CONTENT.soldOutText}</p>
      )}
    </div>
  );
}

PlusMinus.propTypes = {
  data: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};