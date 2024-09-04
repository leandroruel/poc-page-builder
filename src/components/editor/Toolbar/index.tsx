import React, { useState } from "react";
import { Button, Space, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useEditor } from "@craftjs/core";
import {
  UserOutlined,
  LogoutOutlined,
  FontSizeOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Text } from "../../user/Text";
import styles from "./Toolbar.module.css";
import { Row } from "../../user";

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

  const ComponentItem: React.FC<{ icon: React.ReactNode; label: string }> = ({
    icon,
    label,
  }) => {
    return (
      <Card
        style={{
          width: "45px",
          height: "45px",
          margin: "5px",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "#555555",
          borderRadius: "8px",
        }}
      >
        {icon}
        <span style={{ fontSize: "10px", marginTop: "5px", color: "white" }}>
          {label}
        </span>
      </Card>
    );
  };

  return (
    <aside className={styles.toolbarComponent}>
      <div className={styles.toolbarMenu}>
        <Space direction="vertical">
          <Button
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={() => setVisible(!visible)}
            style={{ color: "white" }}
          />
          <Button
            type="link"
            icon={<UserOutlined />}
            onClick={handleUserAccount}
            style={{ color: "white" }}
          />
          <Button
            type="link"
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
            style={{ color: "white" }}
          />
          <Button
            type="link"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ color: "white" }}
          />
        </Space>
      </div>
      <div className={styles.toolbarComponentBody}>
        <div
          ref={(ref) =>
            ref && connectors.create(ref, <Text text="This is a example" italic={false} />)
          }
          style={{
            width: "250px",
          }}
        >
          <div className={styles.toolbarTitle}>Adicionar</div>
          <ComponentItem icon={<FontSizeOutlined />} label="Text" />
        </div>
        <div
          ref={(ref) => ref && connectors.create(ref, <Row />)}
          style={{
            width: "250px",
          }}
        >
          <ComponentItem icon={<BarsOutlined />} label="Row" />
        </div>
      </div>
    </aside>
  );
};

export default Toolbar;
