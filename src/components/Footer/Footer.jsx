import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import footerbg from "@/assets/footerbg.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Top Brands", href: "/brands" },
  { label: "Summer Deals", href: "/deals" },
  { label: "About Us", href: "/about" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
];

function Footer() {
  return (
    <footer className="relative w-full  overflow-hidden">
      {/* Background Image + Dark Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={footerbg}
          alt="footer background"
          fill
          className="object-cover object-center"
          quality={90}
        />
        {/* Dark green gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0a2823]/82 via-[#083228]/93 to-[#051e19]/97" />
      </div>

      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-[10%] w-72 h-48 rounded-full bg-[#1e8d8d]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-[8%] w-60 h-44 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      {/* ── Main Content ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-10 pt-10 pb-8">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-[#1e8d8d] rounded-lg flex items-center justify-center shrink-0 shadow-md shadow-[#1e8d8d]/30">
              <FiShoppingCart size={16} className="text-white" />
            </div>
            <h2 className="text-white text-lg font-bold tracking-tight">
              SunCart
            </h2>
          </div>

          <p className="text-white/50 text-sm leading-relaxed max-w-52.2 mb-5">
            Quality summer products, modern style, and prices that make sense —
            all in one place.
          </p>

          {/* Social Icons */}
          <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-2.5">
            Follow Us
          </p>
          <div className="flex gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-8.5 h-8.5 rounded-lg border border-white/10 bg-white/6 flex items-center justify-center text-white/70 hover:bg-[#1e8d8d]/40 hover:border-[#1e8d8d] hover:text-white transition-all duration-200"
              >
                <Icon size={14} />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm text-white/55 hover:text-emerald-400 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-4">
            Stay Updated
          </h3>
          <div className="bg-white/6 border border-white/10 rounded-xl p-4">
            <p className="text-white/50 text-xs leading-relaxed mb-3">
              Get exclusive deals & summer drops straight to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-white/8 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-[#1e8d8d] focus:ring-1 focus:ring-[#1e8d8d]/30 transition-all duration-200"
              />
              <button className="bg-[#1e8d8d] hover:bg-[#197a7a] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-6 sm:mx-10 border-t border-white/10" />

      {/* Bottom Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-10 py-4">
        <p className="text-white/35 text-xs">
          &copy; {new Date().getFullYear()} SunCart. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="/privacy-policy"
            className="text-xs text-white/35 hover:text-emerald-400 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-xs text-white/35 hover:text-emerald-400 transition-colors duration-200"
          >
            Terms of Service
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-white/25 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Secured & Trusted
        </div>
      </div>
    </footer>
  );
}

export default Footer;
