import { Layout, Flex, ConfigProvider } from "antd";
import Header from "@/components/editor/Header";
import Toolbar from "@/components/editor/Toolbar";
import { Frame, Element, useEditor } from "@craftjs/core";
import { useEffect, useState } from "react";
import cx from "classnames";
import PropertiesSidebar from "@/components/editor/PropertySidebar";
import { Page } from "@/components/user";
import { defaultTheme, editorTheme } from "../theme";
import styles from "./Viewport.module.scss";

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
      <Layout className={styles.viewportLayout}>
        <Header />
        <Layout className={cx("page-container", styles.mainContent)}>
          <Toolbar />
          <ConfigProvider theme={defaultTheme}>
            <Content
              className={cx([
                "craftjs-renderer",
                styles.editorContent,
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
              <div className={styles.scrollableContent}>
                <Flex
                  align="center"
                  justify="space-between"
                  style={{
                    width: "100%",
                    minHeight: "100%",
                    padding: "10px",
                  }}
                >
                  <Frame>
                    <Element is={Page} canvas custom={{ displayName: "App" }} />
                  </Frame>
                </Flex>
              </div>
            </Content>
          </ConfigProvider>
          <PropertiesSidebar />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
