import { useNode } from "@craftjs/core";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { TextSettings } from "./TextSettings";

interface TextProps {
  text: string;
  code?: boolean;
  copyable?: boolean;
  delete?: boolean;
  disabled?: boolean;
  editable?: boolean;
  ellipsis?: boolean;
  keyboard?: boolean;
  mark?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  strong?: boolean;
  italic?: boolean;
  type?: "secondary" | "success" | "warning" | "danger";
  underline?: boolean;
}

export const Text = ({
  text,
  code,
  copyable,
  delete: deleteStyle,
  disabled,
  editable,
  ellipsis,
  keyboard,
  mark,
  onClick,
  strong,
  italic,
  type,
  underline,
}: TextProps) => {
  const [editableState, setEditableState] = useState(false);
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
      setEditableState(false);
    }
  }, [selected]);

  const handleEdit = (newText: string) => {
    setProp((props: any) => (props.text = newText), 1000);
  };

  return (
    <Typography.Text
      ref={(ref) => connect(drag(ref as any))}
      code={code}
      copyable={copyable}
      delete={deleteStyle}
      disabled={disabled}
      editable={
        typeof editable === "boolean"
          ? {
              editing: editableState,
              onStart: () => setEditableState(true),
              onChange: handleEdit,
            }
          : editable
      }
      ellipsis={ellipsis}
      keyboard={keyboard}
      mark={mark}
      onClick={onClick}
      strong={strong}
      italic={italic}
      type={type}
      underline={underline}
    >
      {text}
    </Typography.Text>
  );
};

export const TextDefaultProps = {
  text: "Texto de exemplo",
  code: false,
  copyable: false,
  delete: false,
  disabled: false,
  editable: false,
  ellipsis: false,
  keyboard: false,
  mark: false,
  strong: false,
  italic: false,
  underline: false,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
