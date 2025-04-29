import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <div className="bg-[#0C0950] p-4 w-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-semibold text-lg">
          {role === "admin" ? "Admin Dashboard" : "User's Assign Tasks"}
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-white font-medium text-base space-x-2 px-4 py-2 hover:bg-[#161179] rounded-md transition"
          >
            <FaUserCircle className="text-2xl" />
            <span>Hi</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
