"use client";
import Button from "@/components/ui/Button";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCarListingQuery } from "@/redux/api/carListingApi";
import {
  ArrowRightOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

type ICarProps = {
  params: any;
};

const SingleCarDetailPage = ({ params }: ICarProps) => {
  const { id } = params;
  const { data, isLoading } = useCarListingQuery(id);

  console.log("data", data);

  const comments = data?.Reviews?.map((review: any) => {
    // console.log(review.comment, "comment");
    return review.comment;
  });
  // console.log("comments", comments);

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
        <Row>
          <Col lg={{ span: 12 }}>
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
              <span className="">
                <Link href={"/profile"}>
                  <div className="flex gap-2">
                    <ProfileOutlined className="text-sky-500 text-xl" />
                    <p className="text-sky-500">Profile</p>
                  </div>
                </Link>
              </span>
            </p>
            <p className="">Price: $ {data?.price}</p>
            <p className="">Category: {data?.category}</p>
            <div
              style={{
                fontSize: "20px",
              }}
            >
              <h3>Key Features:</h3>
              <p>{data?.description}</p>
            </div>
            <div>
              <div className="flex gap-2">
                <CommentOutlined className="text-sky-500 text-xl" />:
                <h2>Comments:</h2>
              </div>
              <div className="flex flex-row py-1">
                <ArrowRightOutlined />
                {comments}
              </div>
            </div>

            <br />
            <div>
              <Link href={"/admin/car-listings"}>
                <Button
                  className="max-w-fit hover:opacity-50"
                  small
                  label="Delete"
                />
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
