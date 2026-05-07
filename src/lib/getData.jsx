// async function getData() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/products.json`,
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }
//   return res.json();
// }

// export default getData;
import fs from "fs/promises";
import path from "path";

async function getData() {
  try {
    const filePath = path.join(process.cwd(), "public", "products.json");

    const jsonData = await fs.readFile(filePath, "utf-8");

    const products = JSON.parse(jsonData);

    if (!products || products.length === 0) {
      throw new Error("No products found");
    }

    return products;
  } catch (error) {
    console.error("Products data fetch failed:", error);

    return [];
  }
}

export default getData;
