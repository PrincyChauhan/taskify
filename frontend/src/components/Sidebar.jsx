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
    navigate(e.key);
  };

  const items = [
    {
      key: "/dashboard",
      icon: <AppstoreOutlined />,
      label: "Users List",
    },
    {
      key: "/create-user",
      icon: <PlusOutlined />,
      label: "Create User",
    },
    {
      key: "/create-task",
      icon: <ProfileOutlined />,
      label: "Create Task",
    },
    {
      key: "/tasks",
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
