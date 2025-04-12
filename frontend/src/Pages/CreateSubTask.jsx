import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateSubTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    taskId: taskId,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://taskify-backend-ykux.onrender.com/subtask/create-subtask",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        setError("");
        setFormData({ title: "", description: "", taskId: "" });
        navigate(`/view-task/${taskId}`);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Error while creating subtask: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-10 w-full h-[100%] font-poppins">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[30%] ]">
          <h2 className="text-2xl font-bold text-center mb-3 text-[#0C0950]">
            Create Sub Task
          </h2>
          <form onSubmit={handleSubmit} className="w-full h-full">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtask Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtask Description
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSubTask;
