import React from "react";
import { Button, Space } from "antd";
import { UndoOutlined, SaveOutlined, RedoOutlined } from "@ant-design/icons";
import { useEditor } from "@craftjs/core";
import { Logo } from "./Logo";

const Header: React.FC = () => {
  const { actions, query, enabled, canUndo, canRedo } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: state.options.enabled && query.history.canUndo(),
      canRedo: state.options.enabled && query.history.canRedo(),
    })
  );

  const handleUndo = () => {
    actions.history.undo();
  };

  const handleRedo = () => {
    actions.history.redo();
  };

  const handleSave = () => {
    const json = query.serialize();
    console.log("Componentes serializados:", json);
    // Aqui você pode implementar a lógica para salvar o JSON
  };

  const headerStyles = {
    backgroundColor: "#434343",
    borderBottom: "1px solid #595959",
    color: "#fff",
    padding: "0 10px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <header style={headerStyles}>
        <div style={{ width: "23.14px", height: "23.14px" }}>
          <Logo width={24} height={24} />
        </div>
      <Space>        
        <Button
          type="primary"
          icon={<UndoOutlined />}
          onClick={handleUndo}
          disabled={!canUndo}
        />
        <Button
          type="primary"
          icon={<RedoOutlined />}
          onClick={handleRedo}
          disabled={!canRedo}
        />
        <Button icon={<SaveOutlined />} onClick={handleSave}>
          Salvar
        </Button>
      </Space>
    </header>
  );
};

export default Header;
