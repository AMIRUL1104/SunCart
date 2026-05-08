import Image from "next/image";
import Link from "next/link";
import { CgEye } from "react-icons/cg";
import StarRating from "../ProDetails/StarRating";
import AddCartBtn from "./AddCartBtn";
import WishlistBtn from "./WishlistBtn";

function ProductCard({ data }) {
  const categorySlug = data.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="animate__animated animate__fadeInUp group relative bg-white rounded-2xl overflow-hidden flex flex-col w-full max-w-55 border border-gray-100 hover:border-[#1e8d8d]/40 shadow-sm hover:shadow-xl hover:shadow-cyan-100/60 transition-all duration-300 hover:-translate-y-1">
      {/* Wishlist Button */}
      <WishlistBtn />

      {/* Badge */}
      {data.isPopular && (
        <span className="absolute top-2.5 left-2.5 z-20 bg-[#1e8d8d] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide">
          Popular
        </span>
      )}

      {/* Image Container */}
      <div className="relative w-full h-52 bg-linear-to-br from-gray-50 to-cyan-50/30 overflow-hidden">
        <Image
          src={data.image}
          alt={data.name}
          fill
          sizes="300px"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Slide-up Overlay Actions */}
        <div
          className="absolute bottom-0 left-0 right-0 flex
            translate-y-full group-hover:translate-y-0
            [@media(hover:none)]:translate-y-0
            transition-transform duration-300 ease-out"
        >
          <Link
            href={`/products/${categorySlug}/${data.id}`}
            className="flex items-center justify-center gap-1.5 bg-[#1e8d8d]/90 backdrop-blur-sm hover:bg-[#1e8d8d] text-white text-xs font-medium py-2.5 w-full border-r border-white/20 transition-colors duration-200"
          >
            <CgEye size={15} />
            <span>View</span>
          </Link>

          <AddCartBtn id={data.id} detailPage={false} />
        </div>
      </div>

      {/* Info */}
      <div className="px-3 pt-3 pb-3 flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1e8d8d]/70">
          {data.category}
        </span>

        <p className="text-[13px] font-medium text-gray-700 leading-snug line-clamp-2">
          {data.name}
        </p>

        <div className="flex items-center justify-between mt-0.5">
          <h3 className="text-lg font-bold text-[#1e8d8d]">${data.price}</h3>
          <StarRating rating={data.rating} isTextRate={false} />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-0.5 w-0 group-hover:w-full bg-linear-to-r from-green-300 to-cyan-400 transition-all duration-500 ease-out" />
    </div>
  );
}

export default ProductCard;
