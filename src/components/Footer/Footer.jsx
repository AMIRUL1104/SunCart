import Image from "next/image";

import facebook from "@/assets/facebook.png";
import loginstagram from "@/assets/instagram.png";
import twitter from "@/assets/twitter.png";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full mt-16 ">
      {/* main section */}
      <div className="bg-[#244D3F] py-8 text-center text-sm text-gray-300 flex flex-col items-center justify-center gap-6 px-4">
        <div className="">
          <h2 className=" text-lg sm:text-3xl font-bold text-white">
            SunCart - Summer Essentials Store
          </h2>
        </div>

        <p className="max-w-70 sm:max-w-md leading-relaxed">
          At SunCart, we make summer shopping simple. Quality products, modern
          style, and prices that make sense — all in one place.
        </p>

        <div className="flex flex-col gap-3">
          <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-widest">
            Social Links
          </p>
          <div className="flex items-center justify-center gap-5">
            <Link href="#" className="hover:opacity-80 transition-opacity">
              <Image src={facebook} alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src={loginstagram}
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">
              <Image src={twitter} alt="Twitter" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* divider */}
      <hr className="border-gray-500" />

      {/* copyright and legal section */}
      <div className="bg-[#244D3F] w-full py-6 flex max-sm:flex-col items-center max-sm:justify-between justify-between gap-4 px-4">
        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} SunCart. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/privacy-policy"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms-of-service"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
