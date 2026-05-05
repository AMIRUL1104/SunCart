import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  FiMail,
  FiUser,
  FiEdit2,
  FiMapPin,
  FiShoppingBag,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userInfo = session.user;
  console.log(userInfo);

  return (
    <section className="min-h-screen bg-linear-to-br from-green-50/60 via-white to-cyan-50/40 py-10 px-4 sm:px-6">
      <div className="container mx-auto max-w-2xl">
        {/* Top Card */}
        <div className="relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Banner strip */}
          <div className="h-28 bg-linear-to-r from-green-200/60 via-emerald-100 to-cyan-200/50 relative">
            <div
              className="absolute inset-0 opacity-300"
              style={{
                backgroundImage:
                  "radial-linear(circle at 20% 50%, #1e8d8d 1px, transparent 1px), radial-linear(circle at 80% 30%, #0e9f6e 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute top-3 right-4">
              <HiOutlineSparkles size={18} className="text-[#1e8d8d]/40" />
            </div>
          </div>

          {/* Avatar */}
          <div className="flex col items-center justify-evenly -mt-14 pb-6 px-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full ring-4 ring-white shadow-lg overflow-hidden bg-linear-to-br from-emerald-100 to-cyan-100">
                <Image
                  src={userInfo.image}
                  alt={userInfo.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Online dot */}
              <span className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
            </div>

            <h1 className="mt-3  text-xl font-bold text-gray-900">
              {userInfo.name}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <FiMapPin size={11} /> {userInfo?.location || "Bangladesh"}
            </p>

            {/* Quick stat */}
            <div className="mt-4 flex items-center gap-2 bg-[#1e8d8d]/6 border border-[#1e8d8d]/15 rounded-full px-4 py-1.5">
              <FiShoppingBag size={13} className="text-[#1e8d8d]" />
              <span className="text-xs font-semibold text-[#1e8d8d]">
                0 order placed
              </span>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-4 bg-white rounded-3xl border border-gray-100 shadow-sm px-6 py-5 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Account Details
          </h2>

          {/* Name row */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#1e8d8d]/25 hover:bg-green-50/40 transition-all duration-200">
            <div className="w-9 h-9 rounded-xl bg-[#1e8d8d]/10 flex items-center justify-center shrink-0">
              <FiUser size={15} className="text-[#1e8d8d]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Full Name
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {userInfo.name}
              </p>
            </div>
          </div>

          {/* Email row */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#1e8d8d]/25 hover:bg-green-50/40 transition-all duration-200">
            <div className="w-9 h-9 rounded-xl bg-[#1e8d8d]/10 flex items-center justify-center shrink-0">
              <FiMail size={15} className="text-[#1e8d8d]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Email Address
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {userInfo.email}
              </p>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-4">
          <Link href="/update-profile">
            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold shadow-md shadow-[#1e8d8d]/25 hover:shadow-lg hover:shadow-[#1e8d8d]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
              <FiEdit2 size={15} />
              Update Profile
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
