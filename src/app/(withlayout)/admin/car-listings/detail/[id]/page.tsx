"use client";
import Button from "@/components/ui/Button";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCarListingQuery } from "@/redux/api/carListingApi";
import { CommentOutlined, ProfileOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

type ICarProps = {
  params: any;
};

const SingleCarDetailPage = ({ params }: ICarProps) => {
  const { id } = params;
  const { data, isLoading } = useCarListingQuery(id);
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `admin`, link: `/admin` },
          { label: "car-listings", link: `/admin/car-listings` },
        ]}
      />
      <h1>Detail of The Car</h1>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 26, lg: 32 }}>
          <Col className="gutter-row" lg={{ span: 12 }}>
            <Image
              src={data?.imgUrl}
              width={500}
              height={500}
              alt="BMW X5 4x4"
            />
          </Col>
          <Col lg={{ span: 12 }}>
            <h1 style={{ fontSize: "25px" }}>{data?.name}</h1>

            <div
              className="line"
              style={{
                height: "5px",
                margin: "20px 0",
                background: "#000",
                width: "100%",
              }}
            ></div>
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                color: "gray",
                margin: "10px 0",
                fontSize: "12px",
              }}
            >
              <span style={{ fontSize: "20px" }}>
                <Link href={"/profile"}>
                  <ProfileOutlined />
                </Link>
              </span>
            </p>
            <div
              style={{
                fontSize: "20px",
              }}
            >
              <h3>Key Features:</h3>
              <p>{data?.description}</p>
            </div>
            <h3>
              <CommentOutlined />: {data?.comments}
            </h3>

            <br />
            <div>
              <Link href={"/admin/car-listings"}>
                <Button className="max-w-fit" small label="Delete" />
              </Link>
            </div>
            <br />
            <div>
              <Link href={"/admin/car-listings"}>
                <Button className="max-w-fit" small label="Update" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SingleCarDetailPage;
