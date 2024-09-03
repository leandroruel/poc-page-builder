import React from "react";
import { useNode } from "@craftjs/core";
import { Col as AntCol } from "antd";

interface ColProps {
  children?: React.ReactNode;
  span?: number;
}

const Col = ({ children, span = 24 }: ColProps) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref as any))}>
      <AntCol span={span}>
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