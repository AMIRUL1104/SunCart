import Banner from "@/components/Home/Banner/Banner";
import PopularProducts from "@/components/Home/PopularProduct/PopularProducts";
import CategoryCards from "@/components/Home/ProductCategory/CategoryCards";
import ProductCard from "@/components/Products/ProductCard";
import getData from "./lib/getData";
import TopBrands from "@/components/Home/TopBrands/TopBrands";

export default async function Home() {
  const ProductsData = await getData();
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className=" space-y-8 w-full">
        <Banner />
        <CategoryCards />
        <PopularProducts />

        <TopBrands />
        {/* more products section */}
        <section className="container mx-auto px-4 py-8">
          <h1 className="text-xl font-semibold text-gray-800 leading-snug mb-4 sm:ml-2.5">
            More Products
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 justify-items-center">
            {ProductsData.slice(0, 8).map((product) => (
              <ProductCard data={product} key={product.id} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
