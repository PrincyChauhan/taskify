import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import { MdRemoveRedEye, MdVisibilityOff } from "react-icons/md";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/signin", {
        email: formData.email,
        password: formData.password,
      });
      if (response.data.success) {
        const { token, role, userId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        setSuccess("Login successful!");
        setTimeout(() => {
          setSuccess("");
          if (role === "admin") {
            navigate("/dashboard");
          } else if (role === "user") {
            navigate("/assign-task");
          }
        }, 500);
      } else {
        setError("Failed to login.");
      }
    } catch (error) {
      setError("Error while logging in: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-row items-center justify-around p-10 py-15 w-full h-dvh font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg  max-w-sm w-1/2 h-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0C0950]">
          Login
        </h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        {loading ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80">
            <Spin size="large" />
          </div>
        ) : (
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <MdRemoveRedEye size={20} />
                ) : (
                  <MdVisibilityOff size={20} />
                )}
              </span>
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && (
              <div className="text-green-500 text-sm mb-4">{success}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none"
            >
              Login
            </button>
            <p className="align-baseline font-medium mt-4">
              Haven't an account?{" "}
              <Link
                to="/signup"
                className="text-[#261FB3] hover:text-[#161179]"
              >
                Signup Here
              </Link>
            </p>
          </form>
        )}
      </div>
      <div className="w-1/2 h-full">
        <img src="./login.png" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;
