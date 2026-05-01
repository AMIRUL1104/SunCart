import Link from "next/link";
import React from "react";
import LinkButton from "./Link";

function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content space-y-4 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links.map((link) => (
              <LinkButton key={link.name} link={link}></LinkButton>
            ))}
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost text-xl">
          SunCart
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          {links.map((link) => (
            <LinkButton key={link.name} link={link}></LinkButton>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Link href={"/signin"} className="btn">
          SignIn
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
