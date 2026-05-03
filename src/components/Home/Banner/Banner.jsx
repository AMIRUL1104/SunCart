import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

const stats = [
  { value: "500+", label: "Products" },
  { value: "50+", label: "Top Brands" },
  { value: "Free", label: "Delivery" },
];

function Banner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-green-100 via-emerald-50 to-cyan-100 py-10 md:py-14 px-4 sm:px-6">
      {/* Soft decorative blobs — light, not dark */}
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-[35%] w-60 h-60 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none" />
      <div className="absolute top-6 right-[40%] w-28 h-28 rounded-full bg-[#1e8d8d]/10 blur-2xl pointer-events-none" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10">
        {/* ── Text Side ── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 bg-[#1e8d8d]/10 border border-[#1e8d8d]/25 rounded-full px-3.5 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e8d8d]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0f766e]">
              Summer 2026 Collection
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-bold leading-tight text-emerald-950 text-3xl sm:text-4xl md:text-5xl mb-3">
            Hot Deals on{" "}
            <span className="text-[#1e8d8d]">Summer Essentials</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-800/65 leading-relaxed max-w-sm mb-6">
            Discover trendy outfits, skincare & beach accessories at unbeatable
            prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#1e8d8d] to-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-[#1e8d8d]/30 hover:shadow-xl hover:shadow-[#1e8d8d]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <FiShoppingBag size={15} />
              Shop Now
            </Link>

            <Link
              href="/products?filter=deals"
              className="inline-flex items-center gap-2 bg-white/55 backdrop-blur-sm border border-[#1e8d8d]/25 text-[#0f766e] text-sm font-medium px-4.5 py-2.5 rounded-xl hover:bg-white/80 transition-all duration-200"
            >
              View Deals
              <FiArrowRight size={14} />
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-5 mt-6 pt-5 border-t border-emerald-200/60 w-full justify-center md:justify-start">
            {stats.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-5">
                <div>
                  <p className="text-lg font-bold text-emerald-900 leading-tight">
                    {value}
                  </p>
                  <p className="text-xs text-emerald-700/55">{label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-emerald-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Image Side ── */}
        <div className="relative order-1 md:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-300/30 ring-1 ring-emerald-200/50">
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/044/637/679/small/summer-sale-poster-or-banner-template-featuring-a-tropical-beach-scene-with-sun-and-party-elements-product-display-tropical-summer-scene-perfect-for-promoting-your-summer-products-on-blue-background-vector.jpg"
              alt="Summer sale banner"
              width={600}
              height={420}
              className="w-full h-auto object-cover"
              priority
            />

            {/* Floating badge — top left */}
            <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-[#1e8d8d] flex items-center justify-center shrink-0">
                <HiSparkles size={13} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 leading-none mb-0.5">
                  Limited Offer
                </p>
                <p className="text-xs font-bold text-emerald-900 leading-none">
                  Up to 40% Off
                </p>
              </div>
            </div>

            {/* Floating pill — bottom right */}
            <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-md border border-[#1e8d8d]/20 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#0f766e]">
              Free Shipping
            </div>
          </div>

          {/* Decorative ring behind image */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border-2 border-emerald-200/40 -z-10" />
          <div className="absolute -top-3 -left-3 w-20 h-20 rounded-full border border-cyan-200/40 -z-10" />
        </div>
      </div>
    </section>
  );
}

export default Banner;
