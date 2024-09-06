import { Editor, Element } from "@craftjs/core";
import "@/App.css";
import { Text, Row, Col, DataTable } from "@/components/user";
import { Viewport } from "@/components/editor/Viewport";
import { RenderNode } from "@/components/editor/RenderNode";
import Canvas from "@/components/editor/Canvas";
import { useState, useEffect } from "react";
import { PageListModal } from "@/components/editor/PageListModal";

function Builder() {
  const [isPageListOpen, setIsPageListOpen] = useState(true);

  useEffect(() => {
    setIsPageListOpen(true);
  }, []);

  const handleNewPage = () => {
    setIsPageListOpen(false);
  };

  const handlePageSelect = (pageId: string) => {
    setIsPageListOpen(false);
  };

  return (
    <>
      <Editor
        resolver={{ Text, Row, Col, Element, Canvas, DataTable }}
        onRender={RenderNode}
        enabled={false}
      >
        <Viewport />
        <PageListModal
          isOpen={isPageListOpen}
          onNewPage={handleNewPage}
          onPageSelect={handlePageSelect}
        />
      </Editor>
    </>
  );
}

export default Builder;
