import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, Spin } from "antd";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Users-------------:", filteredUsers);

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
  const dataSource = filteredUsers.map((user, index) => ({
    key: user.id,
    srNo: index + 1,
    username: user.username,
    email: user.email,
    isInvited: user.isInvited,
  }));

  console.log(dataSource, "----------------dataSource");
  return (
    <>
      <div className="mb-4 mt-2 ml-2 flex w-full">
        <input
          type="text"
          placeholder="Search User..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 mr-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 w-full"
        />
      </div>
      <div className="w-full h-full">
        <div className="flex flex-row">
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
    </>
  );
};

export default Dashboard;
