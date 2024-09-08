import { useNode } from "@craftjs/core";
import { PageSettings } from "./PageSettings";

const Page = ({ children }: { children?: React.ReactNode }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref as any))}
      style={{
        minWidth: "900px",
        maxWidth: "1200px",
        height: "100%",
        minHeight: "1200px",
        backgroundColor: "#fff",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
};

export default Page;

Page.Craft = {
  displayName: "Page",
  props: {
    title: {
      type: "string",
      default: "Página",
    },
    height: {
      type: "number",
      default: 100,
    },
    children: {
      type: "component",
      default: "div",
    },
  },
  related: {
    settings: PageSettings,
  },
};
