import { Card, Col, Row, Space } from "antd";
import React from "react";

const PublicCard = ({
  children,
  title,
  hoverable,
  className,
  onTableChange,
  loading,
}: {
  children: React.ReactNode;
  title: string;
  hoverable?: boolean;
  className?: string;
  navigateTo?: string;
  loading?: boolean;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
}) => (
  <Row gutter={{ xs: 12, sm: 16, md: 26, lg: 32 }}>
    <Col
      // key={product.id}
      style={{ margin: "10px 0" }}
      lg={{
        span: 32,
      }}
    >
      <Space direction="vertical" size={16}>
        <Card
          title={title}
          loading={loading}
          // @ts-ignore
          onChange={onTableChange}
          hoverable={hoverable}
          className={className}
        >
          {children}
        </Card>
      </Space>
    </Col>
  </Row>
);

export default PublicCard;
