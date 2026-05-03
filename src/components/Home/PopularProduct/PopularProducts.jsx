import getData from "@/app/lib/getData";
import PopularProductsClient from "./PopularProductsClient";

async function PopularProducts() {
  const ProductsData = await getData();
  return <PopularProductsClient products={ProductsData} />;
}

export default PopularProducts;
