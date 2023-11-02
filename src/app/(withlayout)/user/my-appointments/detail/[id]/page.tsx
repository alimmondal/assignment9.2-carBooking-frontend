"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useAppointmentQuery,
  useDeleteAppointmentMutation,
} from "@/redux/api/appointmentApi";
import { CommentOutlined } from "@ant-design/icons";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";

interface IProps {
  params: any;
}
const UserAppointmentDetailPage = ({ params }: IProps) => {
  const { id } = params;
  const { data, isLoading } = useAppointmentQuery(id);
  //   console.log(data);
  const carListing = data?.listing;
  //   console.log(carListing);

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      console.log(data);
      const res = await deleteAppointment(id);
      if (res) {
        message.success("Car Deleted successfully");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          {
            label: "My appointments",
            link: "/user/my-appointments",
          },
        ]}
      />
      <h1>Appointment Details</h1>
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
          >
            <span style={{ fontSize: "20px" }}>
              {/* <CommentOutlined /> Make a comment */}
            </span>
            {/* <span style={{ fontSize: "20px" }}>
              <Link href={"/profile"}>
                <ProfileOutlined />
                Go to your profile
              </Link>
            </span> */}
          </p>
          <p>Price for single days from bdt</p>
          <p>Price: {carListing?.price}</p>
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
            <CommentOutlined /> Comment:
            {carListing?.comments ? (
              <p>{carListing?.comments}</p>
            ) : (
              <p>no comments</p>
            )}
          </span>

          <Button
            style={{ marginTop: "20px" }}
            onClick={() => deleteHandler(data?.id)}
            type="primary"
          >
            Cancel your appointment
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserAppointmentDetailPage;
