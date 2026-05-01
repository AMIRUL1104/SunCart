import Image from "next/image";
import Link from "next/link";
import React from "react";

function Banner() {
  return (
    <section className="bg-linear-to-r from-green-100 to-cyan-400/20 md:py-10 py-4 px-3 sm:px-4">
      <div className="container mx-auto flex flex-col-reverse items-center gap-4 sm:gap-6 md:grid md:grid-cols-2">
        <div className="text-center w-full px-1">
          <h1 className="text-xl min-[320px]:text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
            🔥 Hot Deals on Summer Essentials 🔥
          </h1>
          <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
            Discover trendy outfits, skincare & beach accessories
          </p>

          <Link href={"/products"} className="inline-block mt-4 sm:mt-6">
            <button className="bg-[#1e8d8d] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base">
              Shop Now
            </button>
          </Link>
        </div>

        <div className="w-full">
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/044/637/679/small/summer-sale-poster-or-banner-template-featuring-a-tropical-beach-scene-with-sun-and-party-elements-product-display-tropical-summer-scene-perfect-for-promoting-your-summer-products-on-blue-background-vector.jpg"
            alt="banner image"
            width={400}
            height={400}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Banner;
