import { useNode } from "@craftjs/core";
import { Collapse, Form, Slider, Switch } from "antd";

export const GridOneColumnSettings = () => {
  const {
    actions: { setProp },
    gutter,
  } = useNode((node) => ({
    gutter: node.data.props.gutter,
  }));

  return (
    <Collapse
      expandIconPosition="end"
      bordered={false}
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: "Configurações do Grid",
          children: (
            <>
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
              <Form.Item label="Ver/Ocultar grid">
                <Switch
                size="small"
                  onChange={(value) =>
                    setProp((props: any) => (props.isVisible = value))
                  }
                />
              </Form.Item>
            </>
          ),
        },
      ]}
    />
  );
};
