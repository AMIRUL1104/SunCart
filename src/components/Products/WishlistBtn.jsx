"use client";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function WishlistBtn() {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <button
      onClick={() => setWishlisted(!wishlisted)}
      className="absolute top-2.5 right-2.5 z-20 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm
          opacity-0 group-hover:opacity-100
          [@media(hover:none)]:opacity-100
          transition-all duration-200 hover:scale-110"
    >
      {wishlisted ? (
        <AiFillHeart size={16} className="text-rose-500" />
      ) : (
        <AiOutlineHeart size={16} className="text-gray-400" />
      )}
    </button>
  );
}

export default WishlistBtn;
