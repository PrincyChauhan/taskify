import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to login first");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/create-invite-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);
      setError("");
      setFormData({ username: "", email: "", password: "", role: "" }); // Clear form
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } catch (error) {
      console.error("Error while creating user:", error);
      setError("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col items-center p-10 w-full h-full font-poppins">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-1/2">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#0C0950]">
              Create User
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="large" />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Name
                  </label>
                  <input
                    type="text"
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179]"
                >
                  Create User
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
