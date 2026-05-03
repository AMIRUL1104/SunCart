"use client";

import { CartContext } from "@/context/CartContest";
import { useContext, useState } from "react";
import { BiCartAdd } from "react-icons/bi";

function AddCartBtn({ id }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { CartData, setCartData } = useContext(CartContext);

  // 🔑 check already in cart
  const isInCart = CartData.some((item) => Number(item.id) === Number(id));

  const handleCart = () => {
    if (isInCart) return; // ❌ duplicate block

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);

    setCartData([...CartData, { id }]);
  };

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
