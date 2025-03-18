import {
  AppstoreOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    if (e.key === "dashboard") {
      navigate("/dashboard");
    } else if (e.key === "create-user") {
      navigate("/create-user");
    } else if (e.key === "create-task") {
      navigate("/create-task");
    } else if (e.key === "tasks") {
      navigate("/tasks");
    } else if (e.key === "logout") {
      // Perform logout logic here
      console.log("Logging out...");
      navigate("/login"); // Redirect to login page
    }
  };

  const items = [
    {
      key: "dashboard",
      icon: <AppstoreOutlined />,
      label: "Users List",
    },
    {
      key: "create-user",
      icon: <PlusOutlined />,
      label: "Create User",
    },
    {
      key: "create-task",
      icon: <ProfileOutlined />,
      label: "Create Task",
    },
    {
      key: "tasks",
      icon: <AppstoreOutlined />,
      label: "Tasks List",
    },
  ];

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      // defaultSelectedKeys={["dashboard"]}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;
