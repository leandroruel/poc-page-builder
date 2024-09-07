import { useNode } from "@craftjs/core";
import { Input, Collapse } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
export const PageSettings = () => {
  const {
    actions: { setProp },
    title,
  } = useNode((node) => ({
    title: node.data.props.title,
  }));

  return (
    <Collapse
      expandIconPosition="end"
      bordered={false}
      defaultActiveKey={["1"]}
    >
      <Panel header="Básico" extra={<FontSizeOutlined />} key="1">
        <Input
          placeholder="Título da página"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProp((props: { title: string; }) => props.title = e.target.value)
          }
        />
      </Panel>
    </Collapse>
  );
};
