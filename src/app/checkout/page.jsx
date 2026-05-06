"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "@/context/CartContest";
import Image from "next/image";
import Link from "next/link";
import {
  FiHome,
  FiCreditCard,
  FiShoppingBag,
  FiTag,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";

const PAYMENT_METHODS = [
  { id: "card", label: "💳 Card" },
  { id: "bkash", label: "📱 bKash" },
  { id: "cod", label: "💵 COD" },
];

export default function CheckoutPage() {
  const { CartData } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [payMethod, setPayMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/products.json");
      const data = await res.json();
      const cartIds = CartData.map((item) => Number(item.id));
      const filtered = data.filter((item) => cartIds.includes(item.id));
      setProducts(filtered);
      const initQty = {};
      filtered.forEach((p) => (initQty[p.id] = 1));
      setQuantities(initQty);
    }
    loadProducts();
  }, [CartData]);

  const subtotal = products.reduce(
    (sum, p) => sum + p.price * (quantities[p.id] || 1),
    0,
  );
  const shipping = subtotal >= 50 ? 0 : 5;
  const total = subtotal + shipping - discount;

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "summer10") setDiscount(subtotal * 0.1);
    else alert("Invalid promo code");
  };

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPlaced(true);
    }, 2000);
  };

  // ── Order Placed ──
  if (placed) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-400 to-[#1e8d8d] flex items-center justify-center mb-5 shadow-lg shadow-[#1e8d8d]/30">
          <FiCheck size={34} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed! 🎉
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          Thank you! Your order has been confirmed. You'll receive a
          confirmation email soon.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-[#1e8d8d]/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
        >
          <FiShoppingBag size={14} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-green-50/60 via-white to-cyan-50/40 py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            🧾 Checkout
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Complete your order in just a few steps
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-7">
          {[
            { label: "Cart", done: true },
            { label: "Checkout", active: true },
            { label: "Confirm", pending: true },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              {i > 0 && (
                <div
                  className={`h-0.5 w-8 rounded-full ${s.done ? "bg-[#1e8d8d]" : i === 1 ? "bg-[#1e8d8d]" : "bg-gray-200"}`}
                />
              )}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    s.done
                      ? "bg-[#1e8d8d] text-white"
                      : s.active
                        ? "bg-[#1e8d8d] text-white ring-4 ring-[#1e8d8d]/20"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {s.done ? <FiCheck size={11} strokeWidth={3} /> : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold ${s.done || s.active ? "text-[#1e8d8d]" : "text-gray-400"}`}
                >
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* ── Left: Forms ── */}
            <div className="lg:col-span-2 space-y-5">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-4">
                  <span className="w-7 h-7 rounded-lg bg-[#1e8d8d]/10 flex items-center justify-center">
                    <FiHome size={13} className="text-[#1e8d8d]" />
                  </span>
                  Shipping Address
                </h2>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                        First Name
                      </label>
                      <input
                        {...register("firstName", { required: "Required" })}
                        placeholder="Rahim"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                        Last Name
                      </label>
                      <input
                        {...register("lastName", { required: "Required" })}
                        placeholder="Khan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email",
                        },
                      })}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9+\s-]{7,15}$/,
                          message: "Enter a valid phone number",
                        },
                      })}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                      Street Address
                    </label>
                    <input
                      {...register("address", {
                        required: "Address is required",
                      })}
                      placeholder="House 12, Road 5, Block C"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                        City
                      </label>
                      <input
                        {...register("city", { required: "Required" })}
                        placeholder="Dhaka"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                        Postal Code
                      </label>
                      <input
                        {...register("postal", { required: "Required" })}
                        placeholder="1207"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                      />
                      {errors.postal && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.postal.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-4">
                  <span className="w-7 h-7 rounded-lg bg-[#1e8d8d]/10 flex items-center justify-center">
                    <FiCreditCard size={13} className="text-[#1e8d8d]" />
                  </span>
                  Payment Method
                </h2>

                {/* Method Tabs */}
                <div className="flex gap-2 mb-4">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayMethod(m.id)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border-2 transition-all duration-200 ${
                        payMethod === m.id
                          ? "border-[#1e8d8d] text-[#1e8d8d] bg-[#1e8d8d]/5"
                          : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Card Fields */}
                {payMethod === "card" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                        Card Number
                      </label>
                      <input
                        {...register("cardNumber", {
                          required:
                            payMethod === "card"
                              ? "Card number is required"
                              : false,
                        })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                          Name on Card
                        </label>
                        <input
                          {...register("cardName", {
                            required: payMethod === "card" ? "Required" : false,
                          })}
                          placeholder="Rahim Khan"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.cardName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                          Expiry
                        </label>
                        <input
                          {...register("expiry", {
                            required: payMethod === "card" ? "Required" : false,
                          })}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                        />
                        {errors.expiry && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.expiry.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                          CVV
                        </label>
                        <input
                          {...register("cvv", {
                            required: payMethod === "card" ? "Required" : false,
                          })}
                          placeholder="•••"
                          maxLength={4}
                          type="password"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.cvv.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {payMethod === "bkash" && (
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                      bKash Number
                    </label>
                    <input
                      {...register("bkashNumber", {
                        required:
                          payMethod === "bkash"
                            ? "bKash number is required"
                            : false,
                      })}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                    />
                    {errors.bkashNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.bkashNumber.message}
                      </p>
                    )}
                  </div>
                )}

                {payMethod === "cod" && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 text-xs text-amber-700 leading-relaxed">
                    💵 You'll pay <strong>${total.toFixed(2)}</strong> in cash
                    when your order is delivered. Please have the exact amount
                    ready.
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-4">
                <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-4">
                  <span className="w-7 h-7 rounded-lg bg-[#1e8d8d]/10 flex items-center justify-center">
                    <FiShoppingBag size={13} className="text-[#1e8d8d]" />
                  </span>
                  Order Summary
                </h2>

                {/* Free shipping notice */}
                {subtotal >= 50 && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-xs text-emerald-700 mb-3 flex items-center gap-1.5">
                    🚚{" "}
                    <span>
                      You qualify for <strong>free shipping!</strong>
                    </span>
                  </div>
                )}

                {/* Products */}
                <div className="space-y-3 mb-4">
                  {products.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-linear-to-br from-gray-50 to-cyan-50 border border-gray-100 shrink-0">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-1">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {p.brand} · Qty: {quantities[p.id] || 1}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-[#1e8d8d] shrink-0">
                        ${(p.price * (quantities[p.id] || 1)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Promo */}
                <div className="mb-4">
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <FiTag size={10} /> Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. SUMMER10"
                      className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="px-3 py-2 rounded-xl bg-[#1e8d8d] text-white text-xs font-semibold hover:bg-[#197a7a] transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-xs text-emerald-600 mt-1.5 font-medium">
                      ✅ Promo applied! -${discount.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtotal</span>
                    <span className="text-gray-700 font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0
                          ? "text-emerald-600 font-medium"
                          : "text-gray-700 font-medium"
                      }
                    >
                      {shipping === 0 ? "Free 🎉" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Discount</span>
                      <span className="text-emerald-600 font-medium">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-800">
                      Total
                    </span>
                    <span className="text-base font-bold text-[#1e8d8d]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full py-3 rounded-xl bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold shadow-md shadow-[#1e8d8d]/25 hover:shadow-lg hover:shadow-[#1e8d8d]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order <FiArrowRight size={14} />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
                  <HiOutlineShieldCheck
                    size={13}
                    className="text-emerald-500"
                  />
                  SSL encrypted & secure checkout
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
