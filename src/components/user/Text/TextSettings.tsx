import { useNode } from "@craftjs/core";
import { Collapse, Form, Radio, Select, Slider, Space, Switch } from "antd";
import { RadioChangeEvent } from "antd";
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

export const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    italic,
    type,
    code,
    underline,
    strong,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    editable: node.data.props.editable,
    italic: node.data.props.italic,
    type: node.data.props.type,
    code: node.data.props.code,
    underline: node.data.props.underline,
    strong: node.data.props.strong,
  }));

  const handleChangeItalic = (value: boolean) => {
    setProp((props: any) => (props.italic = value), 1000);
  };

  const onChangeAlign = (e: RadioChangeEvent) => {
    setProp((props: any) => (props.textAlign = e.target.value), 1000);
  };

  return (
    <Collapse>
      <Panel header="Formatação" key="1">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Switch
            size="small"
            checkedChildren="Itálico"
            checked={italic}
            onChange={handleChangeItalic}
          />
          <Switch
            size="small"
            checkedChildren="Sublinhado"
            checked={underline}
            onChange={(value) => {
              setProp((props: any) => (props.underline = value), 1000);
            }}
          />
          <Switch
            size="small"
            checkedChildren="Código"
            checked={code}
            onChange={(value) => {
              setProp((props: any) => (props.code = value), 1000);
            }}
          />
          <Switch
            size="small"
            checkedChildren="Negrito"
            checked={strong}
            onChange={(value) => {
              setProp((props: any) => (props.strong = value), 1000);
            }}
          />
          <Form.Item label="Tipo de texto">
            <Select
              defaultValue={"primary"}
            size="small"
            value={type}
            onChange={(value) => {
              setProp((props: any) => (props.type = value), 1000);
            }}
          >
            <Select.Option value="primary">Primary</Select.Option>
            <Select.Option value="secondary">Secondary</Select.Option>
            <Select.Option value="success">Success</Select.Option>
            <Select.Option value="warning">Warning</Select.Option>
              <Select.Option value="danger">Danger</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Alinhamento do texto">
            <Radio.Group
              onChange={onChangeAlign}
              defaultValue="left"
              size="small"
            >
              <Radio.Button value="left">
                <AlignLeftOutlined />
              </Radio.Button>
              <Radio.Button value="center">
                <AlignCenterOutlined />
              </Radio.Button>
              <Radio.Button value="right">
                <AlignRightOutlined />
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Space>
      </Panel>
    </Collapse>
  );
};
