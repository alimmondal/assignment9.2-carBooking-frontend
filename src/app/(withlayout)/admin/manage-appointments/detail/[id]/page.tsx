"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAppointmentQuery } from "@/redux/api/appointmentApi";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";

interface IProps {
  params: any;
}
const ReservationDetailPage = ({ params }: IProps) => {
  const { id } = params;
  const { data, isLoading } = useAppointmentQuery(id);
  //   console.log(data);
  const carListing = data?.listing;
  //   console.log("listing", carListing);
  const user = data?.user;
  //   console.log(user);

  return (
    <>
      <UMBreadCrumb
        items={[
          {
            label: "Profile",
            link: "/profile",
          },
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "Car-List",
            link: "/admin/car-listings",
          },
          {
            label: "Manage-appointments",
            link: "/admin/manage-appointments",
          },
        ]}
      />
      <div className="py-10">
        <h2>Reserver detail:</h2>
        {user?.imgUrl ? (
          <Image src={user?.imgUrl} alt="user image" width={100} height={100} />
        ) : (
          <UserOutlined style={{ fontSize: "100px" }} />
        )}
        <h4 className="my-1">User Name: {user?.fullName}</h4>
        <h4>E-mail: {user?.email}</h4>
        <h4 className="my-1">Contact Number: {user?.phoneNumber}</h4>
        <h4>Address: {user?.address}</h4>
      </div>

      <h2>Reserved car Details:</h2>
      <Row gutter={{ xs: 8, sm: 16, md: 26, lg: 32 }}>
        <Col className="gutter-row" lg={{ span: 12 }}>
          <Image
            src={carListing?.imgUrl}
            width={500}
            height={500}
            alt="car image"
          />
        </Col>
        <Col lg={{ span: 12 }}>
          <h1 style={{ fontSize: "25px" }}>{carListing?.name}</h1>

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
          ></p>
          <p>Price for single days from bdt</p>
          <p>Price: {carListing?.price}</p>
          <p>status: {carListing?.status}</p>
          <div
            style={{
              fontSize: "20px",
            }}
          >
            <br />
            <h3>Key Features:</h3>
            <p>{carListing?.description}</p>
          </div>
          <br />
          <span>
            <CommentOutlined /> Reviews:
            {carListing?.comments ? (
              <p>{carListing?.comments}</p>
            ) : (
              <p>no comments</p>
            )}
          </span>
        </Col>
      </Row>
    </>
  );
};

export default ReservationDetailPage;
