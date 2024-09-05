import React, { Suspense } from "react";
import { Modal, Button, Card, Skeleton } from "antd";
import { usePageList } from "@/hooks/usePageList";

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

  return (
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
      style={{ top: 20 }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "start",
        }}
      >
        {isLoading
          ? Array(6)
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
                >
                  <Skeleton active paragraph={{ rows: 1 }} />
                </Card>
              ))
          : pages.map((page: any) => (
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
                <PageCard page={page} onSelect={() => onPageSelect(page.id)} />
              </Suspense>
            ))}
      </div>
    </Modal>
  );
};
