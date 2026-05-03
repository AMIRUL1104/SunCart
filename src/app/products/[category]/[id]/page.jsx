import Image from "next/image";
import { BiCartAdd } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import getData from "@/app/lib/getData";
import StarRating from "@/components/ProDetails/StarRating";
import Quantity from "@/components/ProDetails/Quantity";
import Link from "next/link";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";

export default async function ProductDetails({ params }) {
  const { category, id } = await params;
  // console.log(category);

  const products = await getData();
  const data = products.find((product) => product.id == id);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            {" The product you're looking for doesn't exist."}
          </p>
          <Link href="/products" className="text-[#1e8d8d] hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6 flex gap-2">
          <Link href={"/"} className="hover:text-[#1e8d8d] cursor-pointer">
            Home
          </Link>
          <span>›</span>
          <Link
            href={`/products/${category}`}
            className="hover:text-[#1e8d8d] cursor-pointer"
          >
            {data.category}
          </Link>
          <span>›</span>
          <span className="text-gray-600 line-clamp-1">{data.name}</span>
        </nav>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative bg-gray-50 flex items-center justify-center p-10 border-b md:border-b-0 md:border-r border-gray-100 min-h-72">
              <div className="relative w-full max-w-xs aspect-square">
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Details */}
            <div className="p-7 flex flex-col gap-4">
              {/* Category Badge */}
              <span className="inline-block w-fit text-xs font-medium px-3 py-1 rounded-full bg-[#e1f5ee] text-[#0f6e56]">
                {data.category}
              </span>

              {/* Name & Brand */}
              <div>
                <h1 className="text-xl font-semibold text-gray-800 leading-snug mb-1">
                  {data.name}
                </h1>
                <p className="text-sm text-gray-400">
                  Brand:{" "}
                  <span className="text-[#1e8d8d] font-medium">
                    {data.brand}
                  </span>
                </p>
              </div>

              {/* Rating */}
              <StarRating rating={data.rating} isTextRate={true} />

              {/* Price */}
              <div className="text-3xl font-bold text-[#1e8d8d]">
                ${data.price.toFixed(2)}
              </div>

              <hr className="border-gray-100" />

              {/* Stock */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                <p className="text-sm text-gray-500">
                  In stock —{" "}
                  <span className="text-[#1e8d8d] font-medium">
                    {data.stock} units
                  </span>{" "}
                  available
                </p>
              </div>

              {/* Quantity */}
              <Quantity stock={data.stock} />

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-[#1e8d8d] text-[#1e8d8d] rounded-xl text-sm font-medium hover:bg-[#e1f5ee] transition-colors duration-200">
                  <BiCartAdd size={18} />
                  Add to Cart
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1e8d8d] text-white rounded-xl text-sm font-medium hover:bg-[#176f6f] transition-colors duration-200">
                  <BsBagCheck size={16} />
                  Buy Now
                </button>
              </div>

              <hr className="border-gray-100" />

              {/* Description */}
              <div>
                <p className="text-xs font-medium text-gray-400 mb-1">
                  Description
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-1 text-xs text-gray-400">
                <div className="flex gap-2">
                  <span>SKU:</span>
                  <span className="text-gray-500">
                    #ST-{String(data.id).padStart(5, "0")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>Category:</span>
                  <span className="text-gray-500">{data.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts category={category} />
    </div>
  );
}
