import Image from "next/image";
import Link from "next/link";
import { BiCartAdd } from "react-icons/bi";
import { CgEye } from "react-icons/cg";
import StarRating from "../ProDetails/StarRating";

function ProductCard({ data }) {
  const categorySlug = data.category.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="border border-gray-100 hover:border-[#1e8d8d] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-cyan-100 transition-shadow duration-300 bg-white flex flex-col w-full max-w-55">
      {/* Image */}
      <div className="relative w-full h-52 bg-gray-50">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-contain p-3"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center border-t border-gray-100">
        <Link
          href={`/products/${categorySlug}/${data.id}`}
          className="flex items-center justify-center bg-gray-50 hover:bg-[#1e8d8d] hover:text-white text-gray-500 transition-colors duration-200 py-2.5 w-full border-r border-gray-100"
        >
          <CgEye size={18} />
        </Link>

        <button className="flex items-center justify-center py-2.5 bg-gray-50 hover:bg-[#1e8d8d] hover:text-white text-gray-500 transition-colors duration-200 w-full">
          <BiCartAdd size={18} />
        </button>
      </div>

      {/* Name and Price */}
      <div className="px-3 py-2.5">
        <p className="text-[13px] font-medium text-gray-700 leading-snug line-clamp-2">
          {data.name}
        </p>

        <div className=" flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#1e8d8d] mt-1">
            ${data.price}
          </h3>
          {/* Rating */}
          <StarRating rating={data.rating} isTextRate={false} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
