import React from "react";
import { useNode } from "@craftjs/core";
import { Row as AntRow } from "antd";
import { RowSettings } from "./RowSettings";
import { Element } from "@craftjs/core";
import { Col } from "@/components/user";

interface RowProps {
  children?: React.ReactNode;
  gutter?: number;
}

const Row = ({ children, gutter = 16 }: RowProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref as any))}
      style={{
        border: "1px dashed #ccc",
        backgroundColor: "rgba(200, 200, 200, 0.1)",
        padding: "8px",
        marginBottom: "8px",
      }}
    >
      <AntRow gutter={gutter} style={{ minHeight: "100px", width: "100%" }}>
        <Element id="row-drop-zone" is={Col} canvas>
          {children}
        </Element>
      </AntRow>
    </div>
  );
};

export default Row;

Row.craft = {
  props: {
    gutter: 16,
  },
  related: {
    settings: RowSettings,
  },
};
