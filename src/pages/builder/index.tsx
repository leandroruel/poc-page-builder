import { Editor, Element } from "@craftjs/core";
import "@/App.css";
import { Text, Row, Col, DataTable } from "@/components/user";
import { Viewport } from "@/components/editor/Viewport";
import { RenderNode } from "@/components/editor/RenderNode";
import Canvas from "@/components/editor/Canvas";
import { useState, useEffect } from "react";
import { PageListModal } from "@/components/editor/PageListModal";

function Builder() {
  const [enabled, setEnabled] = useState(false);
  const [isPageListOpen, setIsPageListOpen] = useState(true);

  useEffect(() => {
    // Abrir o modal de lista de páginas ao iniciar
    setIsPageListOpen(true);
  }, []);

  const handleNewPage = () => {
    setEnabled(true);
    setIsPageListOpen(false);
  };

  const handlePageSelect = (pageId: string) => {
    // Aqui você pode carregar o estado da página selecionada
    setEnabled(true);
    setIsPageListOpen(false);
  };

  return (
    <>
      <Editor
        resolver={{ Text, Row, Col, Element, Canvas, DataTable }}
        onRender={RenderNode}
        enabled={enabled}
      >
        <Viewport />
      </Editor>
      <PageListModal
        isOpen={isPageListOpen}
        onNewPage={handleNewPage}
        onPageSelect={handlePageSelect}
      />
    </>
  );
}

export default Builder;
