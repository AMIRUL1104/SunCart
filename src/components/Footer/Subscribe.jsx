"use client";
const handleSubscribe = (e) => {
  e.preventDefault();
};
function Subscribe() {
  return (
    <form onSubmit={handleSubscribe} className="flex gap-2">
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 min-w-0 bg-white/8 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-[#1e8d8d] focus:ring-1 focus:ring-[#1e8d8d]/30 transition-all duration-200"
      />
      <button
        type="submit"
        className="bg-[#1e8d8d] hover:bg-[#197a7a] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}

export default Subscribe;
