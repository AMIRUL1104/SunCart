import getData from "@/app/lib/getData";
import ProductCard from "./ProductCard";

async function Products() {
  const ProductsData = await getData();
  console.log(ProductsData);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 justify-items-center">
        {ProductsData.map((product) => (
          <ProductCard data={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

export default Products;
