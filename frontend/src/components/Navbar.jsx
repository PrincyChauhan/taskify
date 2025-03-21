import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="bg-[#0C0950] p-4">
        <div className="text-white font-semibold text-lg">Admin Dashboard</div>
      </div>
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="inline-block w-full px-4 py-2  focus:border-blue-500 text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
