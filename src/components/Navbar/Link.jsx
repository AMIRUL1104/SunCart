"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
function LinkButton({ link }) {
  const path = usePathname();

  return (
    <Link
      href={link.href}
      className={`${path === link.href && " border-b-2 "} hover:border-b-2`}
      key={link.name}
    >
      {link.name}{" "}
    </Link>
  );
}

export default LinkButton;
