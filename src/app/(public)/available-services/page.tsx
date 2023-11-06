"use client";
import ActionBar from "@/components/ui/ActionBar";
import PublicCard from "@/components/view/Public/PublicCard";
import { useCarListingsQuery } from "@/redux/api/carListingApi";
import { useDebounced } from "@/redux/hooks";
import { Col, Input, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const AvailableService = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useCarListingsQuery({ ...query });
  // console.log("carListings", data);

  const cars = data?.cars;
  const meta = data?.meta;
  // console.log(cars);

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <div className="my-5">
      <div className="ml-5">
        <ActionBar title="Search Your Car List">
          <Input
            type="text"
            size="large"
            placeholder="Search..."
            style={{
              width: "20%",
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </ActionBar>
      </div>

      <Row className="px-20" gutter={{ xs: 8, sm: 16, md: 26, lg: 32 }}>
        <Col
          style={{ margin: "10px 0" }}
          className="gutter-row flex gap-3 flex-wrap items-center justify-center"
          // lg={{
          //   span: 8,
          // }}
        >
          {cars?.map((item: any) => {
            return (
              <Link key={item?.id} href={`/available-services/${item.id}`}>
                <PublicCard
                  loading={isLoading}
                  title={item.name}
                  onTableChange={onTableChange}
                  hoverable
                >
                  <Image
                    src={item.imgUrl}
                    width={250}
                    height={150}
                    alt="Avis"
                  />
                  <h3>Category: {item.category} </h3>
                  <p>Price for single days from</p>
                  <h1>Bdt: {item.price}</h1>
                  <p>Always available</p>
                </PublicCard>
              </Link>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default AvailableService;
