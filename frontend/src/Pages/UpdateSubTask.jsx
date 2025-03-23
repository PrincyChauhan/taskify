import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubTask = () => {
  const { taskId, subtaskId } = useParams();
  const [subtask, setSubtask] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubTask = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          return;
        }
        const response = await axios.get(
          `http://localhost:3000/subtask/get-subtask/${subtaskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubtask(response.data.subtask);
      } catch (error) {
        console.log(error);
        setError("Error while fetching subtask: " + error.message);
      }
    };
    fetchSubTask();
  }, [subtaskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubtask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/subtask/update-subtask`,
        {
          subtaskId,
          taskId,
          title: subtask.title,
          description: subtask.description,
          isCompleted: subtask.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setSuccess("Subtask updated successfully!");
        navigate(`/view-task/${taskId}`);
      } else {
        setError("Failed to update subtask.");
      }
    } catch (error) {
      console.log("Error while updating subtask: " + error.message);
      setError("Error while updating subtask: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-10 w-full h-[100%] font-poppins">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[30%]">
          <h2 className="text-2xl font-bold text-center mb-3 text-[#0C0950]">
            Update Sub Task
          </h2>
          {loading ? (
            <div className="flex justify-center items-center mb-4">
              <div className="animate-spin border-4 border-t-4 border-blue-600 border-solid rounded-full w-8 h-8"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtask Title
                </label>
                <input
                  name="title"
                  type="text"
                  id="title"
                  value={subtask.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtask Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    type="text"
                    id="description"
                    name="description"
                    value={subtask.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-4 flex items-right">
                  <label className="block text-sm font-medium text-gray-700 mr-1">
                    Is Completed
                  </label>

                  <input
                    type="checkbox"
                    name="isCompleted"
                    checked={subtask.isCompleted}
                    className="w-5 h-5"
                    onChange={(e) =>
                      setSubtask((prev) => ({
                        ...prev,
                        isCompleted: e.target.checked,
                      }))
                    }
                  ></input>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none"
                >
                  Update SubTask
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateSubTask;
