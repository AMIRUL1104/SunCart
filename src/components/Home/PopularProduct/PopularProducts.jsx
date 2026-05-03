import getData from "@/app/lib/getData";
import OneRowProducts from "@/components/Shared/OneRowProducts";

async function PopularProducts() {
  const ProductsData = await getData();
  const data = ProductsData.filter((product) => product.isPopular === true);

  return <OneRowProducts title={"🔥 Popular Products"} products={data} />;
}

export default PopularProducts;
