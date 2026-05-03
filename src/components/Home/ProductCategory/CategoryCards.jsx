import getCategories from "@/app/lib/getCategory";
import Image from "next/image";
import Link from "next/link";
function CatetagoryCards() {
  return (
    <div className="flex gap-4 sm:gap-6 items-center justify-evenly flex-wrap px-4 py-6">
      {getCategories.map((cat) => (
        <div
          key={cat.id}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          {/* Circular Image */}
          <Link href={`/products/${cat.slug}`}>
            <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 border-gray-100 shadow-sm group-hover:border-[#1e8d8d] group-hover:shadow-md transition-all duration-300 bg-gray-50 flex items-center justify-center">
              <Image
                src={cat.image}
                alt={cat.name}
                width={70}
                height={70}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>

          {/* Name */}
          <h2 className="text-[12px] sm:text-[13px] font-medium text-gray-600 group-hover:text-[#1e8d8d] transition-colors duration-200 text-center">
            {cat.name}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default CatetagoryCards;
