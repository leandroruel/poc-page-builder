import { Layout, Flex } from "antd";
import { Editor, Frame, Element } from "@craftjs/core";
import "./App.css";
import { Text } from "./components/user/Text";
import Header from "./components/editor/Header";
import Toolbar from "./components/editor/Toolbar";
import Row from "./components/user/Row";

const { Content } = Layout;

function App() {
  return (
    <>
      <Editor resolver={{ Text, Row, Element }}>
        <Layout>
          <Header />
          <Layout style={{ display: "flex", flexDirection: "row" }}>
            <Toolbar />
            <Content className="content">
              <Flex align="center" justify="space-between">
                <div
                  style={{
                    width: "100%",
                    height: "calc(100vh - 50px)",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <Frame>
                    <Element
                      is="div"
                      canvas
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        text="hello world"
                        color="red"
                        fontSize="16"
                        textAlign="center"
                        copyable={false}
                      />
                      <Text
                        text="hello world"
                        color="green"
                        fontSize="16"
                        textAlign="center"
                        copyable={false}
                      />
                    </Element>
                  </Frame>
                </div>
              </Flex>
            </Content>
          </Layout>
        </Layout>
      </Editor>
    </>
  );
}

export default App;
