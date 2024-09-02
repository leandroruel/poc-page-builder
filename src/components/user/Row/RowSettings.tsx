import { useNode } from "@craftjs/core";
import { Form, Slider } from "antd";

export const RowSettings = () => {
  const {
    actions: { setProp },
    gutter,
  } = useNode((node) => ({
    gutter: node.data.props.gutter,
  }));

  return (
    <Form.Item label="Espaçamento entre colunas">
      <Slider
        value={gutter}
        min={0}
        max={48}
        onChange={(value) =>
          setProp((props: any) => (props.gutter = value), 500)
        }
      />
    </Form.Item>
  );
};
