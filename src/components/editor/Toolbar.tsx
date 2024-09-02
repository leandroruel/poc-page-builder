import React, { useState } from "react";
import { Button, Space, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useEditor } from "@craftjs/core";
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreAddOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import { Text } from "../user/Text";

const Toolbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { connectors } = useEditor();

  const handleUserAccount = () => {
    navigate("/user-account");
  };

  const handleLogout = () => {
    // Lógica de logout aqui
  };

  const toolbarStyles: React.CSSProperties = {
    height: "calc(100vh - 50px)",
    backgroundColor: "#434343",
    display: "flex",
    alignItems: "center",
    minWidth: "50px",
    maxWidth: "300px",
  };

  const toolbarMenuStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50px",
    height: "100%",
    borderRight: "1px solid #595959",
    padding: "10px 0",
  };

  const toolbarComponentStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: "#434343",
  };

  const ComponentItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
    return (
      <Card
        style={{
          width: '45px',
          height: '45px',
          margin: '5px',
          padding: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: '#555555',
          borderRadius: '8px',
        }}
      >
        {icon}
        <span style={{ fontSize: '10px', marginTop: '5px', color: 'white' }}>
          {label}
        </span>
      </Card>
    );
  };

  return (
    <aside style={toolbarStyles}>
      <div style={toolbarMenuStyles}>
        <Space direction="vertical">
          <Button
            type="link"
            icon={<AppstoreAddOutlined />}
            onClick={() => setVisible(!visible)}
            style={{ color: "white" }}
          />
          <Button
            type="link"
            icon={<UserOutlined />}
            onClick={handleUserAccount}
          />
          <Button
            type="link"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          />
        </Space>
      </div>
      <div style={toolbarComponentStyles}>
        <div
          ref={(ref) => ref && connectors.create(ref, <Text text="This is a example" />)}
        >
          <ComponentItem
            icon={<FontSizeOutlined />}
            label="Text"
          />
        </div>
      </div>
    </aside>
  );
};

export default Toolbar;
