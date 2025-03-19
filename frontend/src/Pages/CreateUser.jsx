import React from "react";
import Sidebar from "../components/sidebar";

const CreateUser = () => {
  return (
    <div>
      <div className="bg-[#0C0950] p-4">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold text-lg">
            Admin Dashboard
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Sidebar />

        <div className="flex flex-col items-center justify-center p-10 w-full h-[100%] font-poppins">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-1/2 h-full">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#0C0950]">
              Create User
            </h2>

            <form className="w-full h-full">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  User Name
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="user" className="bg-[#0C0950]">
                    User
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
