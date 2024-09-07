import { useNode } from "@craftjs/core";
import { Input, Switch, Collapse } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export const DownloadButtonSettings = () => {
  const {
    actions: { setProp },
    buttonText,
    downloadUrl,
    showIcon,
  } = useNode((node) => ({
    buttonText: node.data.props.buttonText,
    downloadUrl: node.data.props.downloadUrl,
    showIcon: node.data.props.showIcon,
  }));

  return (
    <Collapse expandIconPosition="end" bordered={false} defaultActiveKey={["1"]}>
      <Panel header="Configurações do Botão" extra={<SettingOutlined />} key="1">
        <Input
          placeholder="Texto do botão"
          value={buttonText}
          onChange={(e) =>
            setProp((props: any) => (props.buttonText = e.target.value))
          }
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="URL do arquivo para download"
          value={downloadUrl}
          onChange={(e) =>
            setProp((props: any) => (props.downloadUrl = e.target.value))
          }
          style={{ marginBottom: "10px" }}
        />
        <Switch
          checkedChildren="Mostrar ícone"
          unCheckedChildren="Ocultar ícone"
          checked={showIcon}
          onChange={(checked) =>
            setProp((props: any) => (props.showIcon = checked))
          }
        />
      </Panel>
    </Collapse>
  );
};
