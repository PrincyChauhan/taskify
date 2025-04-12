import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserViewTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(
          `https://taskify-backend-ykux.onrender.com/task/get-task/${taskId}`
        );
        setTask(response.data.task);
        setSubtasks(response.data.task.subtasks);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleStatusChange = async (subtaskId, currentStatus) => {
    try {
      const response = await axios.post(
        "https://taskify-backend-ykux.onrender.com/subtask/update-subtask",
        {
          subtaskId,
          taskId,
          isCompleted: !currentStatus, // Toggle status
        }
      );

      if (response.data.success) {
        // Update UI after successful API call
        setSubtasks((prevSubtasks) =>
          prevSubtasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, isCompleted: !currentStatus }
              : subtask
          )
        );
      }
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  if (!task) return <p>Loading task details...</p>;

  return (
    <div className="flex flex-row p-10 font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 mr-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0C0950]">Task Details</h2>
        <div className="mb-4 flex items-center">
          <label className="text-md font-medium text-gray-700 mr-2">
            Title
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

      {/* subtask section */}

      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-[420px] overflow-y-scroll">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-8 text-[#0C0950]">Sub Tasks</h2>
        </div>
        <div className="mt-4">
          {Array.isArray(task.subtasks) && task.subtasks.length > 0 ? (
            task.subtasks.map((subtask, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <div>
                  <label className="text-md font-medium text-gray-700 mr-2">
                    Subtask Title:
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
                  <span>
                    <input
                      type="checkbox"
                      name="isCompleted"
                      checked={subtask.isCompleted}
                      className="w-5 h-5"
                      onChange={() =>
                        handleStatusChange(subtask.id, subtask.isCompleted)
                      }
                    ></input>
                  </span>
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

export default UserViewTask;
