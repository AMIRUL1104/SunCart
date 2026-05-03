import getData from "@/app/lib/getData";
import OneRowProducts from "../Shared/OneRowProducts";

async function RelatedProducts({ category }) {
  const ProductsData = await getData();
  const data = ProductsData.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase(),
  );

  return <OneRowProducts title={"Related Products"} products={data} />;
}

export default RelatedProducts;
