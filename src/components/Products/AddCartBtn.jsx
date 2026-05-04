"use client";

import { CartContext } from "@/context/CartContest";
import { useContext, useState } from "react";
import { BiCartAdd } from "react-icons/bi";

function AddCartBtn({ id, detailPage }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { CartData, setCartData } = useContext(CartContext);

  // check already in cart
  const isInCart = CartData.some((item) => Number(item.id) === Number(id));

  const handleCart = () => {
    if (isInCart) return;

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);

    setCartData([...CartData, { id }]);
  };

  // ✅ UI split (clean approach)
  if (detailPage) {
    return (
      <button
        onClick={handleCart}
        disabled={isInCart}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-[#1e8d8d] text-[#1e8d8d] rounded-xl text-sm font-medium hover:bg-[#e1f5ee] transition-colors duration-200 disabled:opacity-50"
      >
        <BiCartAdd size={18} />
        {isInCart ? "Added" : "Add to Cart"}
      </button>
    );
  }

  return (
    <button
      onClick={handleCart}
      disabled={isInCart}
      className={`flex items-center justify-center gap-1.5 backdrop-blur-sm text-white text-xs font-medium py-2.5 w-full transition-all duration-200 ${
        isInCart
          ? "bg-gray-400 cursor-not-allowed"
          : addedToCart
            ? "bg-green-500"
            : "bg-[#1e8d8d]/90 hover:bg-[#1e8d8d]"
      }`}
    >
      <BiCartAdd size={15} />
      <span>{isInCart ? "Added" : addedToCart ? "Added!" : "Add"}</span>
    </button>
  );
}

export default AddCartBtn;
