import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex flex-row items-center justify-around p-10 py-15 w-full h-dvh font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm w-1/2 h-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0C0950]">
          Login
        </h2>

        <form className="w-full h-full">
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

          <div className="mb-6">
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none"
          >
            Login
          </button>
          <p className="align-baseline font-medium mt-4">
            Haven't an account?{" "}
            <Link to="/signup" className="text-[#261FB3] hover:text-[#161179]">
              Signup Here
            </Link>
          </p>
        </form>
      </div>
      <div className="w-1/2 h-full">
        <img src="./login.png" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;
