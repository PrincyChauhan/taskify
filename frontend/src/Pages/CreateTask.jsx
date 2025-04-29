import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    subtasks: [{ title: "", description: "" }],
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/auth/get-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, "---------------users----------");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubtaskChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks[index][name] = value;
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  const addSubtask = () => {
    setFormData({
      ...formData,
      subtasks: [
        ...formData.subtasks,
        {
          title: "",
          description: "",
        },
      ],
    });
  };

  const removeSubTask = (index) => {
    const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index);
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token Found");
      return;
    }
    setError(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/task/create-task",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
      setError("");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
        subtasks: [{ title: "", description: "" }],
      });
      setTimeout(() => {
        navigate("/tasks");
      }, 100);
    } catch (error) {
      console.error("Error while creating task:", error);
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-center justify-center p-10 w-full h-[100%] font-poppins">
          <div className="bg-white p-8 rounded-lg shadow-lg  w-[45%] h-full ">
            <h2 className="text-3xl font-bold text-center mb-3 text-[#0C0950]">
              Create Task
            </h2>
            {error && <p className="error text-red-500">{error}</p>}
            {success && <p className="success text-green-500">{success}</p>}

            {loading ? (
              <div className="flex justify-center items-center mb-4">
                <div className="animate-spin border-4 border-t-4 border-blue-600 border-solid rounded-full w-8 h-8"></div>
              </div>
            ) : (
              <form className="w-full h-full" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tittle
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DueDate
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned To:
                  </label>
                  <select
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtasks:
                  </label>
                  {formData.subtasks.map((subtask, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        name="title"
                        value={subtask.title}
                        onChange={(e) => handleSubtaskChange(index, e)}
                        placeholder="Subtask Title"
                        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                      />
                      <textarea
                        name="description"
                        placeholder="Subtask description"
                        value={subtask.description}
                        onChange={(e) => handleSubtaskChange(index, e)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      ></textarea>
                      <button
                        onClick={() => removeSubTask(index)}
                        type="button"
                        className="text-red-500 mt-2"
                      >
                        Remove Subtask
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="text-[#0C0950]"
                    onClick={addSubtask}
                  >
                    Add Subtask
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
