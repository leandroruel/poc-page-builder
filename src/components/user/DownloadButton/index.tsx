import { useState } from "react";
import { Button } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNode } from "@craftjs/core";
import { DownloadButtonSettings } from "./DownloadButtonSettings";

export default function DownloadButton({ text }: { text: string }) {
  const [loading, setLoading] = useState(false);
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    dragged: state.events.dragged,
  }));

  const handleDownload = async () => {
    setLoading(true);
    // Simulating download process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Here you would typically call your API to generate and download the CSV
    // For example: await downloadCSV();
    setLoading(false);
  };

  return (
    <Button
      ref={(ref) => connect(drag(ref as any))}
      type="primary"
      icon={loading ? <LoadingOutlined /> : <DownloadOutlined />}
      loading={loading}
      onClick={handleDownload}
    >
      {loading ? "Downloading..." : text}
    </Button>
  );
}

DownloadButton.Craft = {
  displayName: "DownloadButton",
  props: {
    text: {
      type: String,
      default: "Download CSV",
    },
    onClick: () => {},
  },
  related: {
    settings: DownloadButtonSettings,
  },
};
