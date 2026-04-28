import React, { useContext, useState } from "react";
import { Layout, Menu, Breadcrumb, theme, Avatar, Dropdown, Button, Drawer } from "antd";
import { Outlet, Link, useLocation} from "react-router-dom";
import { useLocalizedNavigate } from "../../hooks/useLocalizedNavigate";
import {
  LaptopOutlined,
  UserOutlined,
  UpOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../Utils/authContext";
import LocalizedLink from "../utiliy-comp/LocalisedLink";

const { Header, Content, Sider } = Layout;

export default function AdminLayout() {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();
  const localizedNavigate = useLocalizedNavigate();
  const { user, logout } = useContext(AuthContext);

  const topMenu = [{ key: "1", label: <LocalizedLink to="/">Store Front</LocalizedLink> }];
  const sideMenu = [
    { key: "sub1", icon: <LaptopOutlined />, label: <LocalizedLink to="/admin/products">Products</LocalizedLink> },
  ];

  const pathSnippets = location.pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    { title: <LocalizedLink to="/admin">Admin</LocalizedLink> },
    ...pathSnippets.slice(1).map((value, index) => ({
      title: <LocalizedLink to={`/${pathSnippets.slice(0, index + 2).join("/")}`}>{value}</LocalizedLink>
    })),
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    logout();
    localizedNavigate("/login");
  };

  const userMenu = {
    items: [{ key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout }],
  };

  const SidebarContent = () => (
    <>
      <Menu mode="inline" defaultOpenKeys={["sub1"]} items={sideMenu} className="border-r-0 h-11/12" />
      <div className="p-2 h-1/12 flex flex-col justify-end">
        <Dropdown menu={userMenu} placement="topLeft" trigger={["click"]}>
          <Button className="w-full h-12 rounded-lg">
            <div className="w-full flex justify-between items-center my-2">
              <Avatar src={user?.avatar || user?.image} icon={<UserOutlined />} />
              <span>{user?.name || "Admin"}</span>
              <UpOutlined />
            </div>
          </Button>
        </Dropdown>
      </div>
    </>
  );

  return (
    <Layout className="min-h-screen h-screen">
      <Header className="flex w-full items-center justify-between px-0">

      <div className="w-1/2">
        <div className="text-white font-bold text-lg">Admin Panel</div>
      </div>

      <div className="w-1/2 flex items-center justify-end">
        <div className="flex">
          <Menu 
            theme="dark" 
            mode="horizontal" 
            items={topMenu} 
            className="min-w-[200px]" 
          />
        </div>
        <div className="md:hidden">
          <Button 
            type="primary" 
            onClick={() => setMobileDrawerOpen(true)} 
            icon={<MenuOutlined />} 
          />
        </div>
      </div>
    </Header>

      <Layout>
        <Sider width={230} style={{ background: colorBgContainer }} className="hidden md:flex flex-col pt-2 justify-evenly">
          <SidebarContent />
        </Sider>

        <Drawer title="Menu" placement="left" onClose={() => setMobileDrawerOpen(false)} open={mobileDrawerOpen} width={230} bodyStyle={{ padding: 0 }}>
          <div className="pt-2 h-full flex flex-col">
            <SidebarContent />
          </div>
        </Drawer>

        <Layout className="p-6 pb-6">
          <Breadcrumb items={breadcrumbItems} className="my-4" />
          <Content style={{ background: colorBgContainer, borderRadius: borderRadiusLG }} className="p-6 min-h-[70vh]">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}