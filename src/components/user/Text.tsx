import { useNode } from "@craftjs/core";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { TextSettings } from "./TextSettings";

interface TextProps {
  text: string;
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textDecoration?: string;
  textTransform?: string;
  textShadow?: string;
  copyable?: boolean;
}

export const Text = ({ text, fontSize, color, copyable }: TextProps) => {
  const [editable, setEditable] = useState(false);
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
  }, [selected]);

  return (

      <Typography.Text
      ref={(ref) => connect(drag(ref as any))}
        copyable={copyable}
        editable={{
          triggerType: ["text"],
          editing: editable,
          onStart: () => setEditable(true),
          onChange: (newText) =>
            setProp((props: any) => (props.text = newText), 1000),
        }}
        style={{ fontSize, color }}
      >
        {text}
      </Typography.Text>
 
  );
};

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 20,
  color: "#000",
  copyable: false,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
