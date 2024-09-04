import { useNode } from "@craftjs/core";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { TextSettings } from "./TextSettings";
import type { EllipsisConfig } from "antd/es/typography/Base";

const { Text: AntdText } = Typography;

interface TextProps {
  text: string;
  code?: boolean;
  copyable?: boolean;
  delete?: boolean;
  disabled?: boolean;
  ellipsis?: EllipsisConfig;
  keyboard?: boolean;
  mark?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  strong?: boolean;
  italic?: boolean;
  type?: "secondary" | "success" | "warning" | "danger";
  underline?: boolean;
  fontSize?: number;
  textAlign?: "left" | "center" | "right" | "justify";
}

export const Text = (props: TextProps) => {
  const {
    text,
    code,
    copyable,
    delete: deleteStyle,
    disabled,
    italic,
    type,
    underline,
    fontSize,
    textAlign,
    strong,
  } = props;

  const [editable, setEditable] = useState(true);
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  useEffect(() => {
    if (!selected) {
      setEditable(false);
    }
  }, [selected, italic]);

  const handleEdit = (newText: string) => {
    setProp((props: any) => (props.text = newText), 1000);
  };

  return (
    <AntdText
      // workaround to re-render the component when the props change
      key={JSON.stringify(props)}
      ref={(ref) => connect(drag(ref as any))}
      code={code}
      copyable={copyable}
      delete={deleteStyle}
      disabled={disabled}
      editable={{
        editing: editable,
        onStart: () => setEditable(true),
        onChange: (newText) => handleEdit(newText),
        triggerType: ["icon"],
        text: text,
      }}
      italic={Boolean(italic)}
      type={type}
      underline={underline}
      {...props}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: strong ? "bold" : "normal",
        textAlign: textAlign ? textAlign : "left",
      }}
    >
      {text}
    </AntdText>
  );
};

export const TextDefaultProps = {
  text: "Texto de exemplo",
  code: false,
  copyable: false,
  delete: false,
  disabled: false,
  ellipsis: false,
  keyboard: false,
  mark: false,
  strong: false,
  italic: false,
  underline: false,
  fontSize: 14,
  textAlign: "left",
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
