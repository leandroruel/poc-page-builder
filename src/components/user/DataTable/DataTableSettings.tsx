import { useNode } from "@craftjs/core";
import {
  Input,
  Switch,
  InputNumber,
  Button,
  Menu,
  Typography,
  Collapse,
  Space,
} from "antd";
import { useState } from "react";
import {
  SettingOutlined,
  TableOutlined,
  ColumnHeightOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Panel } = Collapse;

export const DataTableSettings = () => {
  const {
    actions: { setProp },
    columns,
    title,
    showPagination,
    pageSize,
    dataSource,
  } = useNode((node) => ({
    title: node.data.props.title,
    showPagination: node.data.props.showPagination,
    pageSize: node.data.props.pageSize,
    dataSource: node.data.props.dataSource,
    columns: node.data.props.columns,
  }));

  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnDataIndex, setNewColumnDataIndex] = useState("");

  const addColumn = () => {
    if (newColumnTitle && newColumnDataIndex) {
      setProp((props: any) => {
        props.columns = [
          ...props.columns,
          { title: newColumnTitle, dataIndex: newColumnDataIndex },
        ];
      });
      setNewColumnTitle("");
      setNewColumnDataIndex("");
    }
  };

  return (
    <Collapse expandIconPosition="end" bordered={false} defaultActiveKey={["1"]}>
      <Panel header="Básico" extra={<TableOutlined />} key="1">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Título da tabela"
            value={title}
            onChange={(e) =>
              setProp((props: any) => (props.title = e.target.value))
            }
          />
          <div>
            <Switch
              checkedChildren="Mostrar Paginação"
              unCheckedChildren="Ocultar Paginação"
              checked={showPagination}
              onChange={(checked) =>
                setProp((props: any) => (props.showPagination = checked))
              }
            />
          </div>
          <InputNumber
            addonBefore="Itens por Página"
            value={pageSize}
            onChange={(value: number | null) =>
              setProp((props: any) => (props.pageSize = value ?? 10))
            }
          />
          <Input
            addonBefore="Fonte de Dados"
            value={dataSource}
            onChange={(e) =>
              setProp((props: any) => (props.dataSource = e.target.value))
            }
          />
        </Space>
      </Panel>
      <Panel
        header="Gerencimento de colunas"
        extra={<ColumnHeightOutlined />}
        key="2"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Column Title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
          />
          <Input
            placeholder="Data Index"
            value={newColumnDataIndex}
            onChange={(e) => setNewColumnDataIndex(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addColumn}
            block
          >
            Adicionar Coluna
          </Button>
          <Title level={5}>Colunas Atuais</Title>
          <Menu mode="vertical" theme="light">
            {columns.map((column: any, index: number) => (
              <Menu.Item
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {column.title} ({column.dataIndex})
                </span>
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() =>
                    setProp((props: any) => {
                      props.columns = props.columns.filter(
                        (_: any, i: number) => i !== index
                      );
                    })
                  }
                />
              </Menu.Item>
            ))}
          </Menu>
        </Space>
      </Panel>
      <Panel header="Avançado" extra={<SettingOutlined />} key="3">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Switch
            checkedChildren="Enable Sorting"
            unCheckedChildren="Disable Sorting"
            defaultChecked
            onChange={(checked) =>
              setProp((props: any) => (props.enableSorting = checked))
            }
          />
          <Switch
            checkedChildren="Enable Filtering"
            unCheckedChildren="Disable Filtering"
            defaultChecked
            onChange={(checked) =>
              setProp((props: any) => (props.enableFiltering = checked))
            }
          />
          <Switch
            checkedChildren="Enable Selection"
            unCheckedChildren="Disable Selection"
            onChange={(checked) =>
              setProp((props: any) => (props.enableSelection = checked))
            }
          />
        </Space>
      </Panel>
    </Collapse>
  );
};
