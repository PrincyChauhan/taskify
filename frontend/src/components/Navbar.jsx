import React from "react";

const Navbar = () => {
  const role = localStorage.getItem("role");
  return (
    <div className="bg-[#0C0950] p-4 w-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-semibold text-lg">
          {role === "admin" ? "Admin Dashboard" : "Assign Tasks"}
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="text-white font-semibold text-lg px-4 py-2 bg-[#0C0950] hover:bg-[#161179] rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
