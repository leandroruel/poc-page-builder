import { useNode } from "@craftjs/core";
import { Form, Slider, Switch } from "antd";

export const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    editable,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    editable: node.data.props.editable,
  }));

  return (
    <>
      <Form.Item label="Font size">
        <Slider
          value={fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={(value) => {
            setProp((props: any) => (props.fontSize = value), 1000);
          }}
        />
      </Form.Item>
      <Form.Item label="Editable">
        <Switch
          checked={editable}
          onChange={(value) => {
            setProp((props: any) => (props.editable = value), 1000);
          }}
        />
      </Form.Item>
    </>
  );
};
