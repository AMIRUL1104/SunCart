export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
      <span
        className="loading loading-dots text-[#1e8d8d]"
        style={{ width: "56px", height: "56px" }}
      />
      <p className="text-sm text-gray-400 font-medium tracking-wide">
        Please wait...
      </p>
    </div>
  );
}
