import PublicCard from "@/components/view/Public/PublicCard";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

const AvailableServicePublic = async () => {
  const res = await fetch("http://localhost:5000/api/v1/listings", {
    // cache: "no-cache",
    next: {
      revalidate: 24 * 60 * 60, // time based revalidation
      //on demand revalidation
      tags: ["listings"],
    },
  });
  const { data } = await res.json();
  // console.log(data);
  return (
    <div>
      <Row className="px-20" gutter={{ xs: 8, sm: 16, md: 26, lg: 32 }}>
        <Col
          style={{ margin: "10px 0" }}
          className="gutter-row flex gap-3 flex-wrap items-center justify-center"
          // lg={{
          //   span: 8,
          // }}
        >
          {data.map((item: any) => {
            return (
              <Link key={data.id} href={`/available-services/${item.id}`}>
                <PublicCard title={item.name} hoverable>
                  <Image
                    src={item.imgUrl}
                    width={250}
                    height={150}
                    alt="Avis"
                  />
                  {/* <h1>{item.name}</h1> */}
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

export default AvailableServicePublic;
