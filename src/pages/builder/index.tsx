import { Editor, Element } from "@craftjs/core";
import "@/App.css";
import { Text, Row, Col, DataTable, Page } from "@/components/user";
import { Viewport } from "@/components/editor/Viewport";
import { RenderNode } from "@/components/editor/RenderNode";
import { useState, useEffect } from "react";
import { PageListModal } from "@/components/editor/PageListModal";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from "antd";

function Builder() {
  const [isPageListOpen, setIsPageListOpen] = useState(true);

  useEffect(() => {
    setIsPageListOpen(true);
  }, []);

  const handleNewPage = () => {
    setIsPageListOpen(false);
  };

  const handleClosePageList = () => {
    setIsPageListOpen(false);
  };

  return (
    <>
      <Editor
        resolver={{ Text, Row, Col, Element, Page, DataTable }}
        onRender={RenderNode}
        enabled={false}
      >
        <Viewport />
        <PageListModal
          isOpen={isPageListOpen}
          onNewPage={handleNewPage}
          onPageSelect={handleClosePageList}
        />
      </Editor>
      <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineEnd: 30 }} />
    </>
  );
}

export default Builder;
