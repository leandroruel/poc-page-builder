import { Layout, Flex, ConfigProvider } from "antd";
import Header from "./Header";
import Toolbar from "./Toolbar";
import { Frame, Element, useEditor } from "@craftjs/core";
import { useEffect, useState } from "react";
import cx from "classnames";
import PropertiesSidebar from "@/components/editor/PropertySidebar";
import { Page } from "@/components/user";
import { defaultTheme, editorTheme } from "./theme";

const { Content } = Layout;
export const Viewport = () => {
  const [nodeId, setNodeId] = useState<string | undefined>();
  const {
    enabled,
    connectors,
    hoveredNodeId,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
    hoveredNodeId: state.events.hovered,
  }));

  useEffect(() => {
    const value = Array.from(hoveredNodeId)[0];
    setNodeId(value);

    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        "*"
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions, hoveredNodeId]);

  return (
    <ConfigProvider theme={editorTheme}>
      <Layout>
        <Header />
        <Layout
          style={{
            display: "flex",
            flexDirection: "row",
          }}
          className="page-container"
        >
          <Toolbar />
          <ConfigProvider theme={defaultTheme}>
            <Content
              className={cx([
                "craftjs-renderer",
                {
                  "bg-renderer-gray": enabled,
                },
              ])}
              ref={(ref) =>
                ref &&
                connectors.select(
                  connectors.hover(ref, nodeId ?? ""),
                  nodeId ?? ""
                )
              }
            >
              <Flex
                align="center"
                justify="space-between"
                style={{
                  width: "100%",
                  height: "calc(100vh - 50px)",
                  padding: "10px",
                }}
              >
                <Frame>
                  <Element is={Page} canvas custom={{ displayName: "App" }} />
                </Frame>
              </Flex>
            </Content>
          </ConfigProvider>
          <PropertiesSidebar />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
