"use client";

import { useRef } from "react";
import ProductCard from "@/components/Products/ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function OneRowProducts({ title, products }) {
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

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-gray-800 leading-snug mb-4">
        {title}
      </h1>

      <div className="relative flex items-center">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 -translate-x-3 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
        >
          <FaAngleLeft />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-6 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-45 max-w-45 shrink-0">
              <ProductCard data={product} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 translate-x-3 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
        >
          <FaAngleRight />
        </button>
      </div>
    </section>
  );
}
