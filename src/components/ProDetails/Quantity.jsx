"use client";
import { useState } from "react";

function Quantity({ stock }) {
  const [qty, setQty] = useState(1);

  const changeQty = (delta) => {
    setQty((prev) => Math.max(1, Math.min(stock, prev + delta)));
  };

  return (
    <div>
      <p className="text-xs text-gray-400 mb-2">Quantity</p>
      <div className="flex items-center w-fit border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => changeQty(-1)}
          className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-[#e1f5ee] hover:text-[#0f6e56] text-gray-600 transition-colors duration-150 text-lg"
        >
          −
        </button>
        <span className="w-11 h-9 flex items-center justify-center text-sm font-semibold border-x border-gray-200 text-gray-700">
          {qty}
        </span>
        <button
          onClick={() => changeQty(1)}
          className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-[#e1f5ee] hover:text-[#0f6e56] text-gray-600 transition-colors duration-150 text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Quantity;
