import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Spin } from "antd";
import { MdRemoveRedEye } from "react-icons/md";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/admin/signup`,
        formData
      );
      if (response.data.success) {
        setSuccess("Admin created successfully!");
        toast.success("Admin created successfully!");
        setTimeout(() => {
          setSuccess("");
          navigate("/login");
        }, 1000);
      } else {
        setError("Failed to create admin.");
      }
    } catch (error) {
      setError("Error while creating admin: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-row items-center justify-around p-10 py-15 w-full h-dvh font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-1/2 h-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0C0950]">
          Admin Signup
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
                User Name
              </label>

              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

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

            {/* <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div> */}

            {/* <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div> */}
            {["password", "confirmPassword"].map((field, index) => (
              <div className="mb-6" key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field === "password" ? "Password" : "Confirm Password"}
                </label>
                <div className="relative">
                  <input
                    type={
                      (field === "password" && showPassword) ||
                      (field === "confirmPassword" && showConfirmPassword)
                        ? "text"
                        : "password"
                    }
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <MdRemoveRedEye
                    className="absolute right-3 top-3 cursor-pointer"
                    size={24}
                    onClick={() => togglePasswordVisibility(field)}
                  />
                </div>
              </div>
            ))}

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && (
              <div className="text-green-500 text-sm mb-4">{success}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none"
            >
              Sign Up
            </button>
            <p className="align-baseline font-medium mt-4">
              Already an account?{" "}
              <Link to="/login" className="text-[#261FB3] hover:text-[#161179]">
                Please Login
              </Link>
            </p>
          </form>
        )}

        <ToastContainer />
      </div>
      <div className="w-1/2 h-full">
        <img src="./cover.png" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignupPage;
