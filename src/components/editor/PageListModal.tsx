import React, { Suspense } from "react";
import { Modal, Button, Card, Skeleton, ConfigProvider } from "antd";
import { usePageList } from "@/hooks/usePageList";
import { editorTheme } from "./theme";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";

const PageCard = React.lazy(() => import("./PageCard"));

interface PageListModalProps {
  isOpen: boolean;
  onNewPage: () => void;
  onPageSelect: (pageId: string) => void;
}

export const PageListModal: React.FC<PageListModalProps> = ({
  isOpen,
  onNewPage,
  onPageSelect,
}) => {
  const { pages, isLoading } = usePageList();
  const { actions } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const handleLoadPage = (id: string) => {
    const pageToLoad = pages.find((page) => page.id === id);
    if (pageToLoad && pageToLoad.state) {
      try {
        const decompressedState = lz.decompress(
          lz.decodeBase64(pageToLoad.state)
        );

        // Verificar se o JSON é válido
        JSON.parse(decompressedState);

        actions.deserialize(decompressedState);
        onPageSelect(id);
      } catch (error) {
        console.error("Erro ao carregar a página:", error);
      }
    } else {
      console.warn("Página não encontrada ou estado vazio");
      alert(
        "Não foi possível carregar a página. Estado vazio ou página não encontrada."
      );
    }
  };

  return (
    <ConfigProvider theme={editorTheme}>
      <Modal
        title="Páginas Criadas"
        open={isOpen}
        closable={false}
        maskClosable={false}
        footer={[
          <Button key="new" type="primary" onClick={onNewPage}>
            Criar Nova Página
          </Button>,
        ]}
        width={1200}
        styles={{ body: { height: 400 } }}
        style={{ top: 20 }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "start",
            height: "100%",
          }}
        >
          {isLoading &&
            Array(6)
              .fill(null)
              .map((_, index) => (
                <Card
                  key={index}
                  style={{ width: 250, height: 145 }}
                  cover={
                    <Skeleton.Image
                      style={{ width: 250, height: 145 }}
                      active
                    />
                  }
                />
              ))}

          {!isLoading &&
            Boolean(pages.length) &&
            pages.map((page: any) => (
              <Suspense
                key={page.id}
                fallback={
                  <Card
                    style={{ width: 250, height: 145 }}
                    cover={
                      <Skeleton.Image
                        style={{ width: 250, height: 145 }}
                        active
                      />
                    }
                  >
                    <Skeleton active paragraph={{ rows: 1 }} />
                  </Card>
                }
              >
                <PageCard
                  page={page}
                  onSelect={() => handleLoadPage(page.id)}
                />
              </Suspense>
            ))}
        </div>
      </Modal>
    </ConfigProvider>
  );
};
