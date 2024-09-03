import React from "react";
import { useNode } from "@craftjs/core";
import { Col as AntCol } from "antd";

interface ColProps {
  children?: React.ReactNode;
  span?: number;
}

const Col = ({ children, span = 24 }: ColProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref as any))}>
      <AntCol
        span={span}
        style={{
          backgroundColor: "#E8E8E8",
          height: "100%",
          border: "1px dotted #999",
          padding: "8px",
        }}
      >
        {children}
      </AntCol>
    </div>
  );
};

export default Col;

Col.craft = {
  props: {
    span: 24,
  },
};
