import { Editor, Element } from "@craftjs/core";
import "./App.css";
import { Text, Row, Col } from "./components/user";
import { Viewport } from "./components/editor/Viewport";
import { RenderNode } from "./components/editor/RenderNode";
import Canvas from "./components/editor/Canvas";

function App() {
  return (
    <>
      <Editor resolver={{ Text, Row, Col, Element, Canvas }} onRender={RenderNode}>
        <Viewport />
      </Editor>
    </>
  );
}

export default App;
