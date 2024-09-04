import { useNode, useEditor } from "@craftjs/core";

const Canvas = ({ children }: { children?: React.ReactNode }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      ref={(ref) => connect(drag(ref as any))}
      style={{
        minWidth: "900px",
        maxWidth: "1200px",
        height: "100%",
        minHeight: "300px",
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

export default Canvas;
