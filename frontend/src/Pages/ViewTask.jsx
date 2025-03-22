import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const ViewTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTasks] = useState([]);
  const [subtask, setSubtask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTaskDetails = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You are not authorized to view this page");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/task/get-task/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setTasks(response.data.task);
          const sub = response.data.task.subtask;
          const filteredSubTask = sub.filter(
            (subtask) => subtask.isDeleted === false
          );
          setSubtask(filteredSubTask);
        } else {
          const errorMsg = response.data.message || "No task found.";
          setErrorMessage(errorMsg);
          toast.error(errorMsg);
        }
      } catch (error) {
        console.error("Error fetching task:", error.response || error);
        const errorMsg =
          error.response?.data?.message || "Failed to load task.";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchTaskDetails();
  }, [taskId]);

  const handleCreateSubtask = () => {
    navigate(`/create-subtask/${taskId}`);
  };

  const handleUpdateSubtask = (subTaskId) => {
    navigate(`/update-subtask/${taskId}/${subTaskId}`);
  };

  return (
    <div className="flex flex-row p-10 font-poppins">
      {/* Task Details Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 mr-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0C0950]">Task Details</h2>

        <div className="mb-4 flex items-center">
          <label className="text-md font-medium text-gray-700 mr-2">
            Title:
          </label>
          <span>{task.title}</span>
        </div>

        <div className="mb-4 flex items-center">
          <label className="text-md font-medium text-gray-700 mr-2">
            Description:
          </label>
          <span>{task.description}</span>
        </div>

        <div className="mb-4 flex items-center">
          <label className="text-md font-medium text-gray-700 mr-2">
            Assigned User:
          </label>
          {/* <span>{task.assignedToUser.username}</span> */}
        </div>

        <div className="mb-4 flex items-center">
          <label className="text-md font-medium text-gray-700 mr-2">
            Due Date:
          </label>
          <span>{new Date(task.dueDate).toLocaleDateString("en-US")}</span>
        </div>

        <div className="mb-4 flex items-center">
          <label className="text-md font-medium text-gray-700 mr-2">
            Status:
          </label>
          <span>{task.status}</span>
        </div>

        <div className="mb-4 flex items-center">
          <label className="text-md font-medium text-gray-700 mr-2">
            Created At:
          </label>
          <span>
            {new Date(task.createdAt).toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>

        <div className="mb-4 flex items-center">
          <label className="text-md font-medium text-gray-700 mr-2">
            Updated At:
          </label>
          <span>
            {new Date(task.updatedAt).toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </div>

      {/* Subtasks Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-[420px] overflow-y-scroll">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-8 text-[#0C0950]">Sub Tasks</h2>
          <button
            type="submit"
            onClick={handleCreateSubtask}
            className="py-2 px-3 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none mb-4"
          >
            Add Subtask
          </button>
        </div>

        <div className="mt-4">
          {Array.isArray(task.subtasks) && task.subtasks.length > 0 ? (
            task.subtasks.map((subtask, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <div>
                  <label className="text-md font-medium text-gray-700 mr-2">
                    Title:
                  </label>
                  <span>{subtask.title}</span>
                </div>
                <div>
                  <label className="text-md font-medium text-gray-700 mr-2">
                    Description:
                  </label>
                  <span>{subtask.description}</span>
                </div>
                <div>
                  <label className="text-md font-medium text-gray-700 mr-2">
                    Completed:
                  </label>
                  <span>{subtask.isCompleted?.toString()}</span>
                </div>
                <div>
                  <label className="text-md font-medium text-gray-700 mr-2">
                    Created At:
                  </label>
                  <span>
                    {new Date(subtask.createdAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <div>
                  <label className="text-md font-medium text-gray-700 mr-2">
                    Updated At:
                  </label>
                  <span>
                    {new Date(subtask.updatedAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>

                {/* Icons for Edit and Delete */}
                <div className="flex gap-4 mt-4">
                  <FaPencil
                    className="cursor-pointer hover:text-blue-700"
                    onClick={() => handleUpdateSubtask(subtask.id)}
                  />
                  <MdDeleteOutline className="cursor-pointer hover:text-red-700" />
                </div>
              </div>
            ))
          ) : (
            <p>No Subtasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
