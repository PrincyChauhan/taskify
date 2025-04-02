import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaSpinner,
} from "react-icons/fa";
import { FaList } from "react-icons/fa6";
const DetailPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [taskCounts, setTaskCounts] = useState({
    totalTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [subtaskCounts, setSubTaskCounts] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
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

        setUserCount(response.data.userCount);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchTaskCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/task/task-counts"
        );

        setTaskCounts(response.data);
      } catch (error) {
        console.error("Error fetching task counts:", error);
      }
    };

    const fetchSubTaskCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/subtask/subtask-count"
        );

        setSubTaskCounts(response.data.totalSubTasks);
      } catch (error) {
        console.error("Error fetching task counts:", error);
      }
    };

    fetchUserCount();
    fetchTaskCounts();
    fetchSubTaskCounts();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex items-center p-6 shadow-lg bg-white rounded-2xl">
          <FaUsers className="text-blue-500 text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">User Count</p>
            <p className="text-xl font-bold">{userCount}</p>
          </div>
        </div>

        <div className="flex items-center p-6 shadow-lg bg-white rounded-2xl">
          <FaTasks className="text-green-500 text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">Task Count</p>
            <p className="text-xl font-bold">{taskCounts.totalTasks}</p>
          </div>
        </div>

        <div className="flex items-center p-6 shadow-lg bg-white rounded-2xl">
          <FaList className="text-red-500 text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">Sub Tasks</p>
            <p className="text-xl font-bold">{subtaskCounts}</p>
          </div>
        </div>
      </div>

      {/* Second Row: Completed Tasks, In Progress Tasks, Pending Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center p-6 shadow-lg bg-white rounded-2xl">
          <FaCheckCircle className="text-green-600 text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">Completed Tasks</p>
            <p className="text-xl font-bold">{taskCounts.completedTasks}</p>
          </div>
        </div>

        <div className="flex items-center p-6 shadow-lg bg-white rounded-2xl">
          <FaHourglassHalf className="text-yellow-500 text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">In Progress Tasks</p>
            <p className="text-xl font-bold">{taskCounts.inProgressTasks}</p>
          </div>
        </div>

        <div className="flex items-center p-6 shadow-lg bg-white rounded-2xl">
          <FaSpinner className="text-orange-500 text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">Pending Tasks</p>
            <p className="text-xl font-bold">{taskCounts.pendingTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
