import { Editor, Element } from "@craftjs/core";
import "./App.css";
import { Text } from "./components/user/Text";

import Row from "./components/user/Row";
import { Viewport } from "./components/editor/Viewport";
import { RenderNode } from "./components/editor/RenderNode";

function App() {
  return (
    <>
      <Editor resolver={{ Text, Row, Element }} onRender={RenderNode}>
        <Viewport />
      </Editor>
    </>
  );
}

export default App;
