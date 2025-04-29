import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { MdRemoveRedEye } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(
          `http://localhost:3000/user/get-tasks/${userId}`
        );
        if (response.data.tasksByUserId.length > 0) {
          setTasks(response.data.tasksByUserId);
        } else {
          setError("No tasks found.");
        }
      } catch (err) {
        setError("Error fetching tasks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!taskId || !newStatus) {
        toast.error("Invalid data");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/task/update-task-status",
        { taskId, newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Task status updated successfully");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating task status.");
    }
  };

  const handleViewTask = (taskId) => {
    navigate(`/user-view-task/${taskId}`);
  };

  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created By",
      dataIndex: ["taskCreatedBy", "username"],
      key: "createdBy",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => new Date(dueDate).toLocaleDateString(),
    },
    {
      title: "Task Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Space>
          <Tag
            style={{
              cursor: "pointer",
              backgroundColor: status === "pending" ? "red" : "#f0f0f0",
              color: status === "pending" ? "white" : "#000",
              borderColor: status === "pending" ? "red" : "#d9d9d9",
            }}
            onClick={() => handleStatusChange(record.id, "pending")}
          >
            Pending
          </Tag>
          <Tag
            style={{
              cursor: "pointer",
              backgroundColor: status === "in-progress" ? "#FFB433" : "#f0f0f0",
              color: status === "in-progress" ? "white" : "#000",
              borderColor: status === "in-progress" ? "#FFB433" : "#d9d9d9",
            }}
            onClick={() => handleStatusChange(record.id, "in-progress")}
          >
            In-Progress
          </Tag>
          <Tag
            style={{
              cursor: "pointer",
              backgroundColor: status === "completed" ? "green" : "#f0f0f0",
              color: status === "completed" ? "white" : "#000",
              borderColor: status === "completed" ? "green" : "#d9d9d9",
            }}
            onClick={() => handleStatusChange(record.id, "completed")}
          >
            Completed
          </Tag>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <button onClick={() => handleViewTask(record.id)}>
            <MdRemoveRedEye />
          </button>
        </Space>
      ),
    },
  ];

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Table
        columns={columns}
        dataSource={tasks}
        loading={loading}
        rowKey="id"
      />
      <ToastContainer />
    </>
  );
};

export default UserTasks;
