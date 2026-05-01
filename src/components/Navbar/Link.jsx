"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
function LinkButton({ link }) {
  const path = usePathname();

  return (
    <Link
      href={link.href}
      className={`${path === link.href && "  font-medium text-gray-50 bg-[#1e8d8d]"} text-center hover:font-medium  p-2 rounded-sm `}
      key={link.name}
    >
      {link.name}{" "}
    </Link>
  );
}

export default LinkButton;
