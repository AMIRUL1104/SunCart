"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiImage, FiArrowLeft, FiCheck } from "react-icons/fi";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // live image preview as user types the URL
  const imageUrlValue = watch("image");

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    let updatedData = {};

    const { name, image } = data;
    if (name) updatedData.name = name;
    if (image) updatedData.image = image;

    if (updatedData.length === 0) {
      return alert("Nothing to update");
    }

    try {
      await authClient.updateUser(updatedData);

      setSuccess(true);
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-green-50/60 via-white to-cyan-50/40 py-10 px-4 sm:px-6">
      <div className="container mx-auto max-w-md">
        {/* Back link */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm text-[#1e8d8d] font-medium hover:underline mb-6"
        >
          <FiArrowLeft size={14} /> Back to Profile
        </Link>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm ">
          {/* Header strip */}
          <div className="h-24 bg-linear-to-r from-green-200/60 via-emerald-100 to-cyan-200/50 relative rounded-t-3xl">
            <div
              className="absolute inset-0 opacity-25 rounded-t-3xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, #1e8d8d 1px, transparent 1px), radial-gradient(circle at 80% 30%, #0e9f6e 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="px-6 pb-7 -mt-12 relative z-10">
            {/* Avatar preview */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-linear-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
                {imageUrlValue ? (
                  <Image
                    src={imageUrlValue}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    onError={() => {}}
                  />
                ) : (
                  <FiUser size={32} className="text-[#1e8d8d]/50" />
                )}
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-medium tracking-wide">
                Live Preview
              </p>
            </div>

            <h1 className="text-xl font-bold text-gray-800 mb-1 text-center">
              Update Profile
            </h1>
            <p className="text-xs text-gray-400 text-center mb-6">
              Changes will reflect immediately after saving
            </p>

            {/* Success message */}
            {success && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-4 text-sm text-emerald-700 font-medium">
                <FiCheck size={15} className="text-emerald-500 shrink-0" />
                Profile updated! Redirecting...
              </div>
            )}

            {/* Server error */}
            {serverError && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 text-sm text-red-600">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiUser size={14} />
                  </span>
                  <input
                    {...register("name", {
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    placeholder="Rahim Khan"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Photo URL
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiImage size={14} />
                  </span>
                  <input
                    {...register("image", {
                      pattern: {
                        value: /^https?:\/\/.+\..+/,
                        message:
                          "Enter a valid image URL (must start with http/https)",
                      },
                    })}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1e8d8d] focus:ring-2 focus:ring-[#1e8d8d]/15 focus:bg-white transition-all duration-200"
                  />
                </div>

                <p className="text-[10px] text-gray-400 mt-1.5">
                  Paste a direct image link — the preview above updates live
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold shadow-md shadow-[#1e8d8d]/25 hover:shadow-lg hover:shadow-[#1e8d8d]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
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
                    Saving...
                  </>
                ) : success ? (
                  <>
                    <FiCheck size={15} /> Updated!
                  </>
                ) : (
                  "Update Info"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
