"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // ডিফল্ট হিসেবে ড্যাশবোর্ড

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userdata) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);

    // signin with email
    let { email, password } = userdata;
    const { data, error } = await authClient.signIn.email({
      email: email, // required
      password: password, // required

      callbackURL: callbackUrl,
    });

    if (data) {
      router.push(callbackUrl);
    }
    if (error) {
      alert(error.message);
    }
  };

  const handlegooglesignin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };
  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* ── Left Panel ── */}
      <div className="relative hidden md:flex flex-col items-center justify-center px-10 bg-linear-to-br from-green-100 via-emerald-100 to-cyan-300/50 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#1e8d8d]/20 blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-cyan-300/20 blur-2xl" />

        <div className="relative z-10 text-center max-w-xs">
          <div className="w-16 h-16 bg-[#1e8d8d] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#1e8d8d]/30">
            <FiShoppingCart size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-emerald-900 leading-tight mb-3">
            Welcome Back,
            <br />
            Shopper 🌿
          </h1>
          <p className="text-sm text-emerald-800/70 leading-relaxed">
            Your favourite summer deals, top brands, and trending picks are
            waiting for you.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {["🌿 Fresh Arrivals", "🔥 Hot Deals", "🚚 Fast Delivery"].map(
              (t) => (
                <span
                  key={t}
                  className="bg-white/50 backdrop-blur-sm border border-white/70 text-emerald-800 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="md:hidden w-12 h-12 bg-[#1e8d8d] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#1e8d8d]/25">
            <FiShoppingCart size={22} className="text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-7">
            New here?{" "}
            <Link
              href="/signup"
              className="text-[#1e8d8d] font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.email.message}
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
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e8d8d] transition-colors"
                >
                  {showPass ? (
                    <AiOutlineEyeInvisible size={18} />
                  ) : (
                    <AiOutlineEye size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
              <Link
                href="/forgot-password"
                className="block text-right text-xs text-[#1e8d8d] font-medium mt-1.5 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

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
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Google */}
          <button
            onClick={handlegooglesignin}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-green-50 hover:border-[#1e8d8d]/40 text-sm font-medium text-gray-600 transition-all duration-200 group"
          >
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

          <p className="text-center text-xs text-gray-400 mt-6">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="text-[#1e8d8d] font-medium hover:underline"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
