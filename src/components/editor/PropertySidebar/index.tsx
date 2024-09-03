import { useEditor } from "@craftjs/core";
import styles from "./PropertySidebar.module.css";
import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const PropertySidebar = () => {
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
    <div className={styles.container}>
      <div className={styles.title}>Propriedades</div>
      <div className={styles.content}>
        {isEnabled && selected && (
          <div className={styles.componentContainer}>
            <div className={styles.componentHeader}>
              {selected.isDeletable && (
                <Button
                  type="primary"
                  shape="circle"
                  onClick={() => {
                    actions.delete(selected.id);
                  }}
                  icon={<DeleteOutlined />}
                />
              )}
            </div>
            <div className={styles.componentName}>{selected.name}</div>
            <div>
              {selected.settings && React.createElement(selected.settings)}
            </div>
          </div>
        )}

        {isEnabled && !selected && (
          <div className={styles.noComponentSelected}>
            Selecione um componente para visualizar as propriedades
          </div>
        )}
      </div>
    </div>
  );
};
