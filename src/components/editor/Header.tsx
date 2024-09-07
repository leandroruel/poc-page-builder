import React from "react";
import { Button, Space } from "antd";
import { UndoOutlined, SaveOutlined, RedoOutlined } from "@ant-design/icons";
import { useEditor } from "@craftjs/core";
import { Logo } from "./Logo";
import lz from "lzutf8";
import { Redo, Undo } from "../icons";

const Header: React.FC = () => {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: state.options.enabled && query.history.canUndo(),
    canRedo: state.options.enabled && query.history.canRedo(),
  }));

  const handleUndo = () => {
    actions.history.undo();
  };

  const handleRedo = () => {
    actions.history.redo();
  };

  const handleSave = () => {
    const states = JSON.parse(localStorage.getItem("states") || "[]");
    const json = query.serialize();
    states.push({
      id: Date.now(),
      title: "example page",
      imageUrl: "https://via.placeholder.com/250x145?text=Página+Inicial",
      state: lz.encodeBase64(lz.compress(json)),
    });
    localStorage.setItem("states", JSON.stringify(states));

    console.log("Componentes serializados:", json);
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
          title="Desfazer"
          icon={<Undo width="20" height="20" />}
          onClick={handleUndo}
          disabled={!canUndo}
        />
        <Button
          type="primary"
          title="Refazer"
          icon={<Redo width="20" height="20" />}
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
