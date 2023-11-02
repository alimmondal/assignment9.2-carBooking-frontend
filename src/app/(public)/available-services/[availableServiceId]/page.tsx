"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import UMModal from "@/components/ui/UMModal";
import { useAddAppointmentMutation } from "@/redux/api/appointmentApi";
import { useCarListingQuery } from "@/redux/api/carListingApi";
import { getUserInfo } from "@/services/auth.service";
import { CommentOutlined } from "@ant-design/icons";
import { Button, Col, Row, message } from "antd";
import { Dayjs } from "dayjs";
import Image from "next/image";
import { useState } from "react";

const SingleService = ({
  params: { availableServiceId },
}: {
  params: {
    availableServiceId: string;
  };
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [listingId, setListingId] = useState<string>("");
  const [formValue, setFormValue] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({ startDate: null, endDate: null });

  // console.log(availableServiceId);
  //  const { id } = params;
  const { data, isLoading } = useCarListingQuery(availableServiceId);

  const datas = getUserInfo() as any;
  const role = datas.role;
  const userId = datas.id;
  // console.log(datas);

  const [addAppointment] = useAddAppointmentMutation();

  const onSubmit = async (listingId: string, values: any) => {
    const { startDate, endDate } = values;
    const formData = {
      listingId,
      startDate,
      endDate,
      userId,
    };
    // console.log(formData);
    try {
      const res = await addAppointment(formData);
      if (res) {
        message.success("Appointment submitted successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // const { role } = getUserInfo() as any;
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 26, lg: 32 }}>
        <Col className="gutter-row" lg={{ span: 12 }}>
          <Image src={data?.imgUrl} width={500} height={500} alt="BMW X5 4x4" />
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
              <CommentOutlined /> Make a comment
            </span>
            {/* <span style={{ fontSize: "20px" }}>
              <Link href={"/profile"}>
                <ProfileOutlined />
                Go to your profile
              </Link>
            </span> */}
          </p>
          <p>Price for single days from bdt</p>
          <p>Price: {data?.price}</p>
          <div
            style={{
              fontSize: "20px",
            }}
          >
            <br />
            <h3>Key Features:</h3>
            <p>{data?.description}</p>
          </div>
          <br />
          <span>
            <CommentOutlined /> Comment:
            {data?.comments ? <p>{data?.comments}</p> : <p>no comments</p>}
          </span>
          <div className="" style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setListingId(data?.id);
              }}
            >
              Book an appointment
            </Button>
          </div>
        </Col>
      </Row>
      <UMModal
        title="Select Date"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => onSubmit(listingId, formValue)}
      >
        {role ? (
          <div>
            <Form submitHandler={onSubmit}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="startDate"
                  label="Start Date"
                  size="large"
                  onChange={(date, dateString) =>
                    setFormValue({ ...formValue, startDate: date })
                  }
                />
                <FormDatePicker
                  name="endDate"
                  label="end Date"
                  size="large"
                  onChange={(date, dateString) =>
                    setFormValue({ ...formValue, endDate: date })
                  }
                />
              </div>
            </Form>
          </div>
        ) : (
          <p>You are not logged in</p>
        )}
      </UMModal>
    </div>
  );
};

export default SingleService;
