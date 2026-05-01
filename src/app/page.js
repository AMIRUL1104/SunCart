import Banner from "@/components/Home/Banner/Banner";
import CategoryCards from "@/components/Home/ProductCategory/CategoryCards";
import Products from "@/components/Products/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className=" space-y-8 w-full">
        <Banner />
        <CategoryCards />
        <Products />
      </main>
    </div>
  );
}
