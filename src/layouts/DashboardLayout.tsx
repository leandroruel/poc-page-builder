import {
  Layout,
  Dropdown,
  Menu,
  Button,
  Badge,
  Avatar,
  Breadcrumb,
  MenuProps,
  ConfigProvider,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Logo } from "@/components/editor/Logo";
import { gcbTheme } from "@/themes";

const { Sider, Header, Content } = Layout;

const modules = [
  {
    key: "/",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    children: [
      {
        key: "overview",
        icon: <DashboardOutlined />,
        label: "Overview",
        path: "/dashboard/overview",
      },
      {
        key: "reports",
        icon: <BarChartOutlined />,
        label: "Reports",
        path: "/dashboard/reports",
      },
    ],
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "sales",
        icon: <BarChartOutlined />,
        label: "Sales Analytics",
        path: "/analytics/sales",
      },
      {
        key: "performance",
        icon: <LineChartOutlined />,
        label: "Performance",
        path: "/analytics/performance",
      },
    ],
  },
];

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const moduleMenuItems: MenuProps["items"] = modules.map((module) => ({
    key: module.key,
    label: module.label,
    icon: module.icon,
  }));

  const handleModuleChange = (key: string) => {
    const newModule = modules.find((m) => m.key === key);
    if (newModule) {
      setSelectedModule(newModule);
      navigate(newModule.children[0].path);
    }
  };

  const breadcrumbItems = location.pathname
    .split("/")
    .filter(Boolean)
    .map((path, index, array) => {
      const url = `/${array.slice(0, index + 1).join("/")}`;
      return {
        title: (
          <NavLink
            to={url}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </NavLink>
        ),
      };
    });

  return (
    <ConfigProvider theme={gcbTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={250}
        >
          <div
            className="logo"
            style={{ padding: 16, background: "#FFFFFF", marginBottom: 16 }}
          >
            <Logo width={collapsed ? 40 : 80} height={collapsed ? 40 : 80} />
          </div>
          <Dropdown
            menu={{
              items: moduleMenuItems,
              onClick: ({ key }) => handleModuleChange(key),
            }}
            placement="bottomLeft"
          >
            <Button style={{ width: "90%", margin: "0 5% 16px 5%" }}>
              {selectedModule.label}
            </Button>
          </Dropdown>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={selectedModule.children}
            onClick={({ key }) => {
              const item = selectedModule.children.find(
                (item) => item.key === key
              );
              if (item) {
                navigate(item.path);
              }
            }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#FFFFFF",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  color: "#0033C6",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <Badge count={5} style={{ marginRight: 24 }}>
                  <Button
                    type="text"
                    icon={
                      <BellOutlined
                        style={{ fontSize: 20, color: "#0033C6" }}
                      />
                    }
                  />
                </Badge>
                <Dropdown overlay={userMenu} placement="bottomRight">
                  <Button
                    type="text"
                    icon={
                      <Avatar
                        icon={<UserOutlined />}
                        style={{ backgroundColor: "#0033C6" }}
                      />
                    }
                    style={{ marginLeft: 16 }}
                  />
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#FFFFFF",
            }}
          >
            <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
