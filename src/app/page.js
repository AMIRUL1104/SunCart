import Banner from "@/components/Home/Banner/Banner";
import Products from "@/components/Products/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className=" space-y-8 w-full">
        <Banner />
        <Products />
      </main>
    </div>
  );
}
