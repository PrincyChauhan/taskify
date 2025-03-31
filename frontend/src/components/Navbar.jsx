import React from "react";

const Navbar = () => {
  const role = localStorage.getItem("role");
  return (
    <div className="bg-[#0C0950] p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-semibold text-lg">
          {role === "admin" ? "Admin Dashboard" : "Assign Tasks"}
        </div>
      </div>
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="inline-block w-full text-right focus:border-blue-500 text-white font-semibold text-lg absolute top-0 right-2 size-16"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
