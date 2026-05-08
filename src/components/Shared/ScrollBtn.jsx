"use client";

import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function ScrollBtn({ buttonName }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (buttonName === "left ") {
    {
      /* Left Button */
    }
    <button
      onClick={() => scroll("left")}
      className="absolute left-0 z-10 -translate-x-3 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
    >
      <FaAngleLeft />
    </button>;
  }
  //   right nutton
  return (
    <button
      onClick={() => scroll("right")}
      className="absolute right-0 z-10 translate-x-3 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
    >
      <FaAngleRight />
    </button>
  );
}

export default ScrollBtn;
