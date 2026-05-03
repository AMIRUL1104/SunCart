export default function CartLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <span
        className="loading loading-spinner text-[#1e8d8d]"
        style={{ width: "48px", height: "48px" }}
      />
      <p className="text-sm text-gray-400 font-medium">Loading your cart...</p>
    </div>
  );
}
