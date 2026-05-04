"use client";

import { CartContext } from "@/context/CartContest";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "My Profile", href: "/profile" },
];

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { CartData } = useContext(CartContext);

  // login sesion  info
  const { data: session, isPending } = authClient.useSession();
  const userInfo = session?.user;

  return (
    <nav className="w-full relative overflow-hidden border-b border-white/7 z-50">
      {/* Dark green background — same family as footer */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0a2823]/97 via-[#083c30]/98 to-[#05322a]/99 -z-10" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-[5%] w-56 h-20 rounded-full bg-[#1e8d8d]/18 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-[8%] w-44 h-16 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      {/* ── Desktop Bar ── */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#1e8d8d] rounded-lg flex items-center justify-center shadow-md shadow-[#1e8d8d]/35 shrink-0">
            <FiShoppingCart size={15} className="text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Sun<span className="text-emerald-400">Cart</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="w-0.75 h-0.75 rounded-full bg-white/20 mx-1" />
                )}
                <Link
                  href={link.href}
                  className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-emerald-400 bg-emerald-400/10"
                      : "text-white/55 hover:text-white hover:bg-white/7"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/12 bg-white/6 text-white/70 hover:text-white hover:bg-white/12 hover:border-white/20 transition-all duration-200 text-sm font-medium"
          >
            <FiShoppingCart size={15} />
            <span className="hidden sm:inline">Cart</span>
            {/* Badge */}
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#1e8d8d] text-white text-[9px] font-bold flex items-center justify-center border-2 border-[#0a2823]">
              {CartData.length}
            </span>
          </Link>

          {/* Sign In */}
          {isPending ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : userInfo ? (
            <div className="flex items-center justify-between gap-4 ">
              <Link href={"/profile"}>
                <Image
                  src={userInfo.image || user}
                  alt="user"
                  width={30}
                  height={30}
                  className=" rounded-full"
                />
              </Link>
              <button
                onClick={async () => await authClient.signOut()}
                className="px-4 py-2 rounded-lg bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold shadow-md shadow-[#1e8d8d]/30 hover:shadow-lg hover:shadow-[#1e8d8d]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 ">
              <Link
                href="/signin"
                className="px-4 py-2 rounded-lg bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold shadow-md shadow-[#1e8d8d]/30 hover:shadow-lg hover:shadow-[#1e8d8d]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden ml-1 w-9 h-9 flex items-center justify-center rounded-lg border border-white/12 bg-white/6 text-white/70 hover:text-white hover:bg-white/12 transition-all duration-200"
          >
            {menuOpen ? <FiX size={17} /> : <FiMenu size={17} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/8 px-5 py-3 flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-white/55 hover:text-white hover:bg-white/7"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
