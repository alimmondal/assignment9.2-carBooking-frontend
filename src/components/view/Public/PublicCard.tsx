import { Card, Col, Row, Space } from "antd";
import React from "react";

const PublicCard = ({
  children,
  title,
  hoverable,
  className,
}: {
  children: React.ReactNode;
  title: string;
  hoverable?: boolean;
  className?: string;
  navigateTo?: string;
}) => (
  <Row gutter={{ xs: 8, sm: 16, md: 26, lg: 32 }} className="flex">
    <Col
      // key={product.id}
      style={{ margin: "10px 0" }}
      className="gutter-row"
      lg={{
        span: 8,
      }}
    >
      <Space direction="vertical" size={16}>
        <Card hoverable={hoverable} title={title} className={className}>
          {children}
        </Card>
      </Space>
    </Col>
  </Row>
);

export default PublicCard;
