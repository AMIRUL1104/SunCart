import manswear from "@/assets/manswear.webp";
import womanswear from "@/assets/womenswear.jpg";
import skincare from "@/assets/skincare.jpg";
import accesories from "@/assets/accesories.jpg";
import footwear from "@/assets/footwear.webp";
import beach from "@/assets/beach.webp";
import electronics from "@/assets/electronics.jpg";
import summer from "@/assets/summer.jpg";
import Image from "next/image";

const getCategories = [
  {
    id: 1,
    name: "Men's Wear",
    image: manswear,
    slug: "menswear",
  },
  {
    id: 2,
    name: "Women's Wear",
    image: womanswear,
    slug: "womenswear",
  },
  {
    id: 3,
    name: "Skincare",
    image: skincare,
    slug: "skincare",
  },
  {
    id: 4,
    name: "Accessories",
    image: accesories,
    slug: "accessories",
  },
  {
    id: 5,
    name: "Footwear",
    image: footwear,
    slug: "footwear",
  },
  {
    id: 6,
    name: "Beach Essentials",
    image: beach,
    slug: "beach-essentials",
  },
  {
    id: 7,
    name: "Electronics",
    image: electronics,
    slug: "electronics",
  },
  {
    id: 8,
    name: "Summer Deals",
    image: summer,
    slug: "summer-deals",
  },
];

export default getCategories;
