import React from "react";
import { Layout, Button, Typography, Space, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useEditor } from "@craftjs/core";

const { Sider } = Layout;
const { Title } = Typography;

export default function PropertiesSidebar() {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  return (
    <Sider width={300} theme="light" className="properties-sidebar">
      <div style={{ padding: "16px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={5} style={{ margin: 0 }}>
            Propriedades
          </Title>
          <Divider style={{ margin: "0 0 8px 0" }} />
          {isEnabled && selected && selected.isDeletable && (
            <Button
              type="primary"
              danger
              icon={<CloseOutlined />}
              onClick={() => {
                actions.delete(selected.id);
              }}
              block
            >
              Remover componente
            </Button>
          )}
        </Space>
      </div>
      <div>
        {isEnabled &&
          selected &&
          selected.settings &&
          React.createElement(selected.settings)}
      </div>
    </Sider>
  );
}
