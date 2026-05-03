"use client";

import { CartContext } from "@/context/CartContest";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

function CartPage() {
  const { CartData, setCartData } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/products.json");
      const data = await res.json();
      const cartIds = CartData.map((item) => Number(item.id));
      const filtered = data.filter((item) => cartIds.includes(item.id));
      setProducts(filtered);

      // Initialize quantities to 1 for each product
      const initQty = {};
      filtered.forEach((p) => (initQty[p.id] = 1));
      setQuantities(initQty);
    }
    loadProducts();
  }, [CartData]);

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    setCartData(updated);
  };

  const handleQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const subtotal = products.reduce(
    (sum, p) => sum + p.price * (quantities[p.id] || 1),
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  // ── Empty Cart ──
  if (products.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-green-100 to-cyan-100 flex items-center justify-center mb-5 shadow-md">
          <FiShoppingBag size={32} className="text-[#1e8d8d]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          Looks like you haven't added anything yet. Explore our summer
          collection!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-[#1e8d8d]/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
        >
          <FiArrowLeft size={15} />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-green-50/60 via-white to-cyan-50/40 py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              🛒 My Cart
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {products.length} item{products.length > 1 ? "s" : ""} in your
              cart
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-[#1e8d8d] font-medium hover:underline"
          >
            <FiArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Product List ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1e8d8d]/20 transition-all duration-200 p-4 flex gap-4 items-start"
              >
                {/* Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-linear-to-br from-gray-50 to-cyan-50 shrink-0">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-1.5"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1e8d8d]/70">
                        {p.brand} · {p.category}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-800 leading-snug mt-0.5 line-clamp-2">
                        {p.name}
                      </h3>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    {/* Quantity */}
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-1 py-0.5">
                      <button
                        onClick={() => handleQty(p.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:text-[#1e8d8d] hover:bg-white transition-all duration-150"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="text-sm font-semibold text-gray-700 w-5 text-center">
                        {quantities[p.id] || 1}
                      </span>
                      <button
                        onClick={() => handleQty(p.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:text-[#1e8d8d] hover:bg-white transition-all duration-150"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-base font-bold text-[#1e8d8d]">
                      ${(p.price * (quantities[p.id] || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineSparkles size={16} className="text-[#1e8d8d]" />
                <h2 className="text-base font-bold text-gray-800">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({products.length} items)</span>
                  <span className="font-medium text-gray-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? "text-emerald-600 font-medium"
                        : "font-medium text-gray-800"
                    }
                  >
                    {shipping === 0 ? "Free 🎉" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {/* Free shipping nudge */}
                {subtotal < 50 && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-xs text-emerald-700">
                    Add <strong>${(50 - subtotal).toFixed(2)}</strong> more for
                    free shipping!
                  </div>
                )}

                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-lg text-[#1e8d8d]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href={"/checkout"}>
                <button className="mt-5 w-full py-3 rounded-xl bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold shadow-md shadow-[#1e8d8d]/25 hover:shadow-lg hover:shadow-[#1e8d8d]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                  Proceed to Checkout
                </button>
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Secure & encrypted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
