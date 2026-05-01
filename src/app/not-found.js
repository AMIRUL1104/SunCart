import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      <div className="max-w-md text-center">
        {/* বড় টেক্সট বা ইলাস্ট্রেশন */}
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-widest">
          This Page is Not Found
        </h1>

        <Link className=" btn btn-soft mt-8" href={"/"}>
          Back To Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
