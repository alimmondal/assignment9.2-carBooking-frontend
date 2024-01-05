"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import UMModal from "@/components/ui/UMModal";
import { useAddAppointmentMutation } from "@/redux/api/appointmentApi";
import { useCarListingQuery } from "@/redux/api/carListingApi";
import { useAddReviewsMutation } from "@/redux/api/reviewsApi";
import { getUserInfo } from "@/services/auth.service";
import {
  ArrowRightOutlined,
  CommentOutlined,
  SendOutlined,
} from "@ant-design/icons";
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
  const { data, isLoading } = useCarListingQuery(availableServiceId, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });
  // console.log(data);

  // console.log(id);
  const comments = data?.Reviews;
  // console.log(comments);

  const datas = getUserInfo() as any;
  const role = datas.role;
  const userId = datas.id;
  // console.log(datas);

  const [addAppointment] = useAddAppointmentMutation();
  const [addReviews] = useAddReviewsMutation();

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
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onSubmitReview = async (values: any) => {
    const comment = values.comment;
    const id = data?.id;
    const formData = {
      comment,
      listingId: id,
    };
    console.log(formData);
    try {
      const res = await addReviews(formData);
      if (res) {
        message.success("Comment submitted successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("reviewForm");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      // You can use "auto" instead of "smooth" for an instant scroll
    }
  };

  // const { role } = getUserInfo() as any;
  return (
    <div className="py-20">
      <Row className="mb-10" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" lg={{ span: 12 }}>
          <Image src={data?.imgUrl} width={350} height={300} alt="BMW X5 4x4" />
        </Col>
        <Col className="px-3" lg={{ span: 12 }}>
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
            <span
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => scrollToForm()}
            >
              <CommentOutlined /> Make a{" "}
              <span className="text-rose-500">comment</span>
            </span>
            {/* <span style={{ fontSize: "20px" }}>
                <ProfileOutlined />
            </span> */}
          </p>

          <p className="my-2">Category:{data?.category}</p>

          <h4>Price for single days from bdt</h4>
          <p>Price: {data?.price}</p>
          <div>
            <br />
            <p
              style={{
                fontSize: "20px",
              }}
            >
              Key Features:
            </p>
            <p
              style={{
                fontSize: "15px",
              }}
            >
              {data?.description}
            </p>
          </div>
          <br />
          <span style={{ fontSize: "20px" }}>
            <CommentOutlined /> Reviews and Ratings:
          </span>
          <span style={{ fontSize: "15px" }}>
            <ul className="">
              {comments?.map((comment: any) => (
                <span key={comment} className="flex flex-row py-1">
                  <ArrowRightOutlined />
                  <li style={{ listStyle: "none" }} key={comment}>
                    {comment?.comment}
                  </li>
                </span>
              ))}
            </ul>
          </span>
          <div className="" style={{ marginTop: "20px" }}>
            <Button
              className="p"
              type="primary"
              onClick={() => {
                setOpen(true);
                setListingId(data?.id);
              }}
            >
              Book an Appointment
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
          <p>
            You are not logged in. First <a href="/register">Register</a> and
            then <span>Login</span>
          </p>
        )}
      </UMModal>

      <h3 className="text-center">Make your valuable comment</h3>
      <div
        id="reviewForm"
        className=""
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "5px",
          padding: "10px",
          margin: "20px 5%",
        }}
      >
        <Form submitHandler={onSubmitReview}>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={12}>
              <div style={{ margin: "10px 0px" }}>
                <FormInput
                  type="text"
                  name="comment"
                  label="Reviews and Ratings"
                  placeholder="Write your valuable review"
                  required
                />
              </div>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                className="rounded-full h-20 w-20  text-[25px]"
                htmlType="submit"
              >
                <SendOutlined />
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SingleService;
