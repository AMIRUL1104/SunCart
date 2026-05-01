import Banner from "@/components/Home/Banner/Banner";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className=" w-full">
        <Banner />
      </main>
    </div>
  );
}
