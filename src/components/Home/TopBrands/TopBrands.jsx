import Image from "next/image";

const brands = [
  {
    id: 1,
    brandName: "LinenCo",
    logo: "https://johnwatson.in/cdn/shop/products/october0866.jpg?v=1665782102&width=700",
    description:
      "Premium quality linen apparel for a clean and sophisticated summer look.",
    isTopBrand: true,
  },
  {
    id: 2,
    brandName: "RayShield",
    logo: "https://florentineeyewear.com.au/cdn/shop/files/Artboard_2_3fcd6bd3-4781-485a-a64d-bf65e791c681.jpg?v=1614362876",
    description:
      "High-performance polarized eyewear with complete UV protection.",
    isTopBrand: true,
  },
  {
    id: 3,
    brandName: "UVGuard",
    logo: "https://fairskincarebd.com/wp-content/uploads/2023/09/Valencia-Gio-Nature-Plus-Sun-Block-SPF50-Collagen-Sun-Cream.jpg",
    description:
      "Expert skincare solutions providing broad-spectrum sun protection.",
    isTopBrand: true,
  },
];

export default function TopBrands() {
  const topBrands = brands.filter((b) => b.isTopBrand);

  return (
    <section className="bg-linear-to-r from-green-100 to-cyan-400/20 py-8 md:py-12 px-3 sm:px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1e8d8d] mb-1">
            Featured
          </p>
          <h2 className="animate__fadeInDown text-2xl md:text-3xl font-bold text-gray-800">
            🏆 Top Brands
          </h2>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {topBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Logo Image */}
              <div className="relative w-full h-44 bg-white">
                <Image
                  src={brand.logo}
                  alt={brand.brandName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-800">
                    {brand.brandName}
                  </h3>
                  <span className="text-xs bg-cyan-100 text-[#1e8d8d] font-medium px-2 py-0.5 rounded-full">
                    Top Brand
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-snug">
                  {brand.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
