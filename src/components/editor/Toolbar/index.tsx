import React, { ReactElement, useState } from "react";
import { Button, Space, Collapse, Flex, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useEditor } from "@craftjs/core";
import {
  UserOutlined,
  LogoutOutlined,
  FontSizeOutlined,
  HomeOutlined,
  BarsOutlined,
  TableOutlined,
  PlusCircleFilled,
  FileAddOutlined,
} from "@ant-design/icons";
import styles from "./Toolbar.module.css";
import { DataTable, Row, Text } from "../../user";
import { GridRow, Table, TextSolid } from "@/components/icons";

const { Panel } = Collapse;

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

  const ComponentItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    component: ReactElement;
  }> = ({ icon, label, component }) => {
    return (
      <Flex
        ref={(ref) => ref && connectors.create(ref, component)}
        vertical
        align="center"
        justify="center"
        style={{
          cursor: "move",
          width: "100%",
          height: "100%",
          padding: "10px",
        }}
      >
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Flex
            align="center"
            justify="center"
            style={{
              width: 30,
              height: 30,
              background: "white",
              borderRadius: 5,
            }}
          >
            {icon}
          </Flex>
          <span
            style={{
              fontSize: "10px",
              marginTop: "5px",
              color: "white",
              textAlign: "center",
            }}
          >
            {label}
          </span>
        </Flex>
      </Flex>
    );
  };

  return (
    <aside className={styles.toolbarComponent}>
      <div className={styles.toolbarMenu}>
        <Space
          direction="vertical"
          style={{ justifyContent: "space-between", height: "100%" }}
        >
          <Button
            type="link"
            icon={<PlusCircleFilled />}
            onClick={() => setVisible(!visible)}
            style={{ color: "white" }}
          />
          <div>
            <Tooltip title="Nova página" placement="right">
              <Button
                type="link"
                icon={<FileAddOutlined />}
                onClick={() => navigate("/")}
                style={{ color: "white" }}
              />
            </Tooltip>
            <Tooltip title="Conta" placement="right">
              <Button
                type="link"
                icon={<UserOutlined />}
                onClick={handleUserAccount}
                style={{ color: "white" }}
              />
            </Tooltip>
            <Tooltip title="Ir para home" placement="right">
              <Button
                type="link"
                icon={<HomeOutlined />}
                onClick={() => navigate("/")}
                style={{ color: "white" }}
              />
            </Tooltip>
            <Tooltip title="Logout" placement="right">
              <Button
                type="link"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ color: "white", marginTop: 20 }}
              />
            </Tooltip>
          </div>
        </Space>
      </div>
      <div className={styles.toolbarComponentBody}>
        <div className={styles.toolbarTitle}>Adicionar</div>
        <Collapse
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          bordered={false}
        >
          <Panel header="Básico" key="1" extra={<FontSizeOutlined />}>
            <Flex justify="start">
              <ComponentItem
                icon={<TextSolid />}
                label="Texto"
                component={<Text text="This is a example" italic={false} />}
              />
            </Flex>
          </Panel>
          <Panel header="Grid" key="2" extra={<BarsOutlined />}>
            <ComponentItem
              icon={<GridRow width="20" height="20" color="#000" />}
              label="Grid 1 coluna"
              component={<Row />}
            />
          </Panel>
          <Panel header="Tabelas" key="3" extra={<TableOutlined />}>
            <ComponentItem
              icon={<Table width="20" height="20" color="#000" />}
              label="Tabela com filtro simples"
              component={<DataTable />}
            />
          </Panel>
        </Collapse>
      </div>
    </aside>
  );
};

export default Toolbar;
