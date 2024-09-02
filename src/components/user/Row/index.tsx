import React from 'react';
import { useNode } from '@craftjs/core';
import { Row as AntRow, Col } from 'antd';
import { RowSettings } from './RowSettings';

interface RowProps {
  children?: React.ReactNode;
  gutter?: number;
}

const Row = ({ children, gutter = 16 }: RowProps) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref as any))}>
      <AntRow gutter={gutter}>
        {React.Children.map(children, (child, index) => (
          <Col key={index} span={24 / React.Children.count(children)}>
            {child}
          </Col>
        ))}
      </AntRow>
    </div>
  );
};



Row.craft = {
  props: {
    gutter: 16,
  },
  related: {
    settings: RowSettings,
  },
};

export default Row;