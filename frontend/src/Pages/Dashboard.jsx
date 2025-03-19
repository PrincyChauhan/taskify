import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Table, Tag, Spin } from "antd";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // logic here
        return;
      }

      const response = await axios.get("http://localhost:3000/auth/get-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { users } = response.data;
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Is Invited",
      dataIndex: "isInvited",
      key: "isInvited",
      render: (isInvited) => (
        <Tag color={isInvited ? "green" : "volcano"}>
          {isInvited ? "Yes" : "No"}
        </Tag>
      ),
    },
  ];
  const dataSource = users.map((user, index) => ({
    key: user.id,
    srNo: index + 1,
    username: user.username,
    email: user.email,
    isInvited: user.isInvited,
  }));

  return (
    <div className="w-full h-full">
      <div className="bg-[#0C0950] p-3">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold text-lg">
            Admin Dashboard
          </div>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="inline-block w-full px-4 py-2  focus:border-blue-500 text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-row">
        <Sidebar />
        {loading ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={dataSource}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
