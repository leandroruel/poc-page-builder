import React from "react";
import { Card } from "antd";

const { Meta } = Card;

interface PageCardProps {
  page: {
    id: string;
    title: string;
    imageUrl: string;
  };
  onSelect: () => void;
}

const PageCard: React.FC<PageCardProps> = ({ page, onSelect }) => (
  <Card
    hoverable
    style={{ width: 250, height: 220, marginBottom: 10 }}
    cover={
      <img
        alt={page.title}
        src={page.imageUrl}
        style={{ height: 145, objectFit: "cover" }}
      />
    }
    onClick={onSelect}
  >
    <Meta title={page.title} />
  </Card>
);

export default PageCard;
