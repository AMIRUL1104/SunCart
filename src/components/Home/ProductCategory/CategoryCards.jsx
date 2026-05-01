import manswear from "@/assets/manswear.webp";
import womanswear from "@/assets/womenswear.jpg";
import skincare from "@/assets/skincare.jpg";
import accesories from "@/assets/accesories.jpg";
import footwear from "@/assets/footwear.webp";
import beach from "@/assets/beach.webp";
import electronics from "@/assets/electronics.jpg";
import summer from "@/assets/summer.jpg";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Men's Wear",
    image: manswear,
    slug: "menswear",
  },
  {
    id: 2,
    name: "Women's Wear",
    image: womanswear,
    slug: "womenswear",
  },
  {
    id: 3,
    name: "Skincare",
    image: skincare,
    slug: "skincare",
  },
  {
    id: 4,
    name: "Accessories",
    image: accesories,
    slug: "accessories",
  },
  {
    id: 5,
    name: "Footwear",
    image: footwear,
    slug: "footwear",
  },
  {
    id: 6,
    name: "Beach Essentials",
    image: beach,
    slug: "beach-essentials",
  },
  {
    id: 7,
    name: "Electronics",
    image: electronics,
    slug: "electronics",
  },
  {
    id: 8,
    name: "Summer Deals",
    image: summer,
    slug: "summer-deals",
  },
];
function CatetagoryCards() {
  return (
    <div className="flex gap-4 sm:gap-6 items-center justify-evenly flex-wrap px-4 py-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          {/* Circular Image */}
          <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 border-gray-100 shadow-sm group-hover:border-[#1e8d8d] group-hover:shadow-md transition-all duration-300 bg-gray-50 flex items-center justify-center">
            <Image
              src={cat.image}
              alt={cat.name}
              width={70}
              height={70}
              className="object-cover w-full h-full"
            />
          </div>

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
