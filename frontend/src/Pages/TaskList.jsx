import React, { useEffect, useState } from "react";
import { Table, Spin, Modal, Space, Tag } from "antd";
import axios from "axios";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const showModal = (taskId) => {
    setCurrentTaskId(taskId);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
    setCurrentTaskId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token || role !== "admin") {
        setErrorMessage("You are not authorized to view this page");
        setLoading(false);
        return;
      }
      try {
        const [userResponse, taskResponse] = await Promise.all([
          axios.get("http://localhost:3000/auth/get-users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/task/get-tasks", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const userMap = {};
        userResponse.data.users.forEach((user) => {
          userMap[user.id] = user.username;
        });
        const formattedTasks = taskResponse.data.tasks.map((task) => ({
          ...task,
          key: task.id,
          assignedTo: userMap[task.assignedTo] || "Unknown User",
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setErrorMessage("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      console.log(error);
      toast.error("An error occurred while updating task status.");
      setErrorMessage("An error occurred while updating task status. ");
    }
  };

  const handleDeleteClick = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/task/delete-task/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success("Task deleted successfully");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        hideModal();
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting task.");
    }
  };

  const handleViewTask = (taskId) => {
    navigate(`/view-task/${taskId}`);
  };

  const handleUpdateTask = (taskId) => {
    navigate(`/update-task/${taskId}`);
  };

  const columns = [
    {
      title: "Task title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Assigned User",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
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
      render: (record) => (
        <div className="flex space-x-4">
          <button onClick={() => handleViewTask(record.id)}>
            <MdRemoveRedEye />
          </button>
          <button>
            <FaPencil onClick={() => handleUpdateTask(record.id)} />
          </button>
          <button onClick={() => showModal(record.id)}>
            <MdDeleteOutline></MdDeleteOutline>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row justify-between">
        {loading ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80">
            <Spin size="large" />
          </div>
        ) : errorMessage ? (
          <div className="text-red-500">{errorMessage}</div>
        ) : (
          <Table
            columns={columns}
            dataSource={tasks}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <Modal
        title="Confirm Deletion"
        open={open}
        onOk={() => handleDeleteClick(currentTaskId)}
        onCancel={hideModal}
        okText="Yes, Delete"
        cancelText="Cancel"
        icon={<ExclamationCircleOutlined />}
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
};

export default TaskList;
