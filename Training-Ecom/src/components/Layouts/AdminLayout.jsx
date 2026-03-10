import React, {useContext, useEffect} from "react";
import { Layout, Menu, Breadcrumb, theme, Avatar, Dropdown, Button } from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  UpOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../Utils/authContext";

const { Header, Content, Sider } = Layout;

const topMenu = [
  { key: "1", label: <Link to="/">Store Front</Link> },
];

const sideMenu = [
  {
    key: "sub1",
    icon: <LaptopOutlined />,
    label: <Link to="/admin/products">Products</Link>,
  },
  {
    key: "sub2",
    icon: <UserOutlined />,
    label: "Users",
    children: [
      { key: "1", label: <Link to="/admin/users">User List</Link> },
      { key: "2", label: <Link to="/admin/users/create">Create User</Link> },
    ],
  },
  {
    key: "sub3",
    icon: <NotificationOutlined />,
    label: "Orders",
    children: [
      { key: "5", label: <Link to="/admin/orders">Order List</Link> },
    ],
  },
];

export default function AdminLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const pathSnippets = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    { title: <Link to="/admin">Admin</Link> },
    ...pathSnippets.slice(1).map((value, index) => {
      const url = `/${pathSnippets.slice(0, index + 2).join("/")}`;
      return { title: <Link to={url}>{value}</Link> };
    }),
  ];

const handleLogout = () => {
    localStorage.removeItem("access_token");
    logout();
    navigate("/login");
  };


  const userMenu = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Profile",
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: "Settings",
      },
      { type: "divider" },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Layout className="min-h-screen h-screen">

      {/* Header */}
      <Header className="flex items-center">
        <div className="text-white font-bold mr-8">
          Admin Panel
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={topMenu}
          className="flex-1"
        />
      </Header>

      <Layout>

        {/* Sidebar */}
        <Sider
          width={230}
          style={{ background: colorBgContainer }}
          className="flex flex-col pt-2 justify-evenly"
        >

          {/* Menu */}
          <Menu
            mode="inline"
            defaultOpenKeys={["sub1"]}
            items={sideMenu}
            className="border-r-0 h-11/12"
          />

          {/* Sticky Bottom User Section */}
          <div className="p-0 h-1/12 flex flex-col justify-end p-2">
          <div className="p-2">
            <Dropdown menu={userMenu} placement="topLeft"   trigger={["click"]}>
              <Button
                className="w-full h-12 rounded-lg"
              >
                <div className=" w-full flex justify-between items-center my-2">
                    <Avatar
                        src={user?.avatar || user?.image}
                        icon={<UserOutlined />}
/>
                    <span>{user?.name || "Admin"}</span>
                    <UpOutlined />
                </div>
                
              </Button>
            </Dropdown>
          </div>
            
          </div>

        </Sider>

        {/* Content */}
        <Layout className="p-6 pb-6">

          <Breadcrumb
            items={breadcrumbItems}
            className="my-4"
          />

          <Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="p-6 min-h-70"
          >
            <Outlet />
          </Content>

        </Layout>

      </Layout>

    </Layout>
  );
}