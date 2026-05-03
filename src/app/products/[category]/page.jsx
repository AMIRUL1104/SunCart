import Link from "next/link";
import getData from "@/app/lib/getData";
import ProductCard from "@/components/Products/ProductCard";

async function CategoryPage({ params }) {
  const { category } = await params;
  const data = await getData();
  const categoryData = data.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase(),
  );

  if (!categoryData || categoryData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            No Products Found
          </h1>
          <p className="text-gray-600">
            {"This category doesn't have any products yet."}
          </p>
        </div>
      </div>
    );
  }

  const categoryName = categoryData[0].category;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 mb-6 flex gap-2">
            <Link href="/" className="hover:text-[#1e8d8d] cursor-pointer">
              Home
            </Link>
            <span>›</span>
            <span className="text-gray-600">{categoryName}</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {categoryName}
          </h1>
          <p className="text-gray-600">
            Showing {categoryData.length} products
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {categoryData.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
