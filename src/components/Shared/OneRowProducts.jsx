import ProductCard from "@/components/Products/ProductCard";
import ScrollBtn from "./ScrollBtn";

export default function OneRowProducts({ title, products }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className=" text-xl font-semibold text-gray-800 leading-snug mb-4">
        {title}
      </h1>

      <div className="relative flex items-center">
        {/* Left Button */}
        <ScrollBtn buttonName={"left"} />

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-6 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-45 max-w-45 shrink-0">
              <ProductCard data={product} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <ScrollBtn buttonName={"right"} />
      </div>
    </section>
  );
}
