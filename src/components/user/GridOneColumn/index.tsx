import React from "react";
import { useNode } from "@craftjs/core";
import { Row, Col, ColProps } from "antd";
import { GridOneColumnSettings } from "./GridOneColumnSettings";
import { Element } from "@craftjs/core";

const GridOneColumn = ({
  gutter = 16,
  isVisible = true,
}: {
  children?: React.ReactNode;
  gutter?: number;
  isVisible?: boolean;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Row
      gutter={gutter}
      ref={(ref) => ref && connect(drag(ref))}
      style={{
        border: isVisible ? "1px solid black" : "none",
        minHeight: 100,
      }}
    >
      <Element
        id="row-draggable"
        is={Col as ColProps}
        span={24}
        canvas
        style={{
          border: isVisible ? "1px solid red" : "none",
        }}
      />
    </Row>
  );
};

export default GridOneColumn;

GridOneColumn.craft = {
  displayName: 'Grid de 1 Coluna',
  props: {
    gutter: 0,
  },
  related: {
    settings: GridOneColumnSettings,
  },
};
