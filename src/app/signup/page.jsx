"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiCheck } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const perks = [
  "Exclusive member-only discounts",
  "Track orders in real-time",
  "Wishlist & saved items",
  "Free delivery on first order",
];

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthConfig = [
  { label: "Weak", color: "bg-red-400", width: "w-1/4" },
  { label: "Fair", color: "bg-orange-400", width: "w-2/4" },
  { label: "Good", color: "bg-yellow-400", width: "w-3/4" },
  { label: "Strong", color: "bg-green-500", width: "w-full" },
];

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = password.length > 0 ? getStrength(password) : 0;
  const strengthInfo = strength > 0 ? strengthConfig[strength - 1] : null;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (userdata) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    console.log(userdata);
  };

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* ── Left Panel: Form ── */}
      <div className="flex items-center justify-center px-6 py-10 bg-white overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="md:hidden w-12 h-12 bg-[#1e8d8d] rounded-xl flex items-center justify-center mb-5 shadow-md shadow-[#1e8d8d]/25">
            <FiShoppingCart size={22} className="text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Already a member?{" "}
            <Link
              href="/login"
              className="text-[#1e8d8d] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                placeholder="Rahim Khan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Email Address
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
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\s-]{7,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                placeholder="+880 1XXX-XXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  placeholder="Min. 8 characters"
                  className="w-full px-3.5 py-2.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e8d8d] transition-colors"
                >
                  {showPass ? (
                    <AiOutlineEyeInvisible size={17} />
                  ) : (
                    <AiOutlineEye size={17} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}

              {/* Strength bar */}
              {password.length > 0 && strengthInfo && (
                <div className="mt-2">
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthInfo.color} ${strengthInfo.width}`}
                    />
                  </div>
                  <p
                    className={`text-xs mt-1 font-medium ${
                      strength === 4
                        ? "text-green-600"
                        : strength === 3
                          ? "text-yellow-600"
                          : strength === 2
                            ? "text-orange-500"
                            : "text-red-500"
                    }`}
                  >
                    {strengthInfo.label} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  placeholder="Re-enter password"
                  className="w-full px-3.5 py-2.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e8d8d] transition-colors"
                >
                  {showConfirm ? (
                    <AiOutlineEyeInvisible size={17} />
                  ) : (
                    <AiOutlineEye size={17} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms to continue",
                })}
                id="terms"
                className="mt-0.5 w-4 h-4 accent-[#1e8d8d] cursor-pointer shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-500 leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#1e8d8d] font-medium hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#1e8d8d] font-medium hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <span className="text-red-500 text-xs -mt-2 block">
                {errors.terms.message}
              </span>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold shadow-md shadow-[#1e8d8d]/25 hover:shadow-lg hover:shadow-[#1e8d8d]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
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
                  Creating account...
                </span>
              ) : (
                "Create My Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">or sign up with</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-green-50 hover:border-[#1e8d8d]/40 text-sm font-medium text-gray-600 transition-all duration-200 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="group-hover:text-[#1e8d8d] transition-colors">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-xs text-gray-400 mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1e8d8d] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right Panel: Brand ── */}
      <div className="relative hidden md:flex flex-col items-center justify-center px-10 bg-linear-to-bl from-green-100 via-emerald-100 to-cyan-300/50 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#1e8d8d]/20 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-cyan-300/20 blur-2xl" />

        <div className="relative z-10 text-center max-w-xs">
          <div className="w-16 h-16 bg-[#1e8d8d] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#1e8d8d]/30">
            <FiShoppingCart size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-emerald-900 leading-tight mb-3">
            Join Us &<br />
            Start Shopping 🛍️
          </h2>
          <p className="text-sm text-emerald-800/70 leading-relaxed mb-6">
            Create your free account and unlock exclusive summer deals, top
            brands & more.
          </p>
          <div className="flex flex-col gap-3 text-left">
            {perks.map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-white/70 rounded-xl px-4 py-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-[#1e8d8d] flex items-center justify-center shrink-0">
                  <FiCheck size={11} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-emerald-800">
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
