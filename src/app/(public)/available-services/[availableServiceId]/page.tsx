"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import Button from "@/components/ui/Button";
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
import { Col, Row, message } from "antd";
import { Dayjs } from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SingleService = ({
  params: { availableServiceId },
}: {
  params: {
    availableServiceId: string;
  };
}) => {
  const { push } = useRouter();
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
    <div className="p-4 md:p-24">
      <Row className="mb-10" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" lg={{ span: 12 }}>
          <Image src={data?.imgUrl} width={550} height={500} alt="BMW X5 4x4" />
        </Col>
        <Col className="px-3" lg={{ span: 12 }}>
          <h1 style={{ fontSize: "25px" }}>{data?.name}</h1>

          <div className="h-1 w-10/12 mt-5 bg-sky-500"></div>
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
              <CommentOutlined className="text-sky-500 hover:text-rose-500" />{" "}
              Make a{" "}
              <span className="text-sky-500 hover:text-rose-500">comment</span>
            </span>
            {/* <span style={{ fontSize: "20px" }}>
                <ProfileOutlined />
            </span> */}
          </p>

          <p className="my-2">Category:{data?.category}</p>

          <h4 className="">Price for single days from bdt</h4>
          <p className="font-semibold">Price: {data?.price}</p>
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

          <ul className="">
            {comments?.map((comment: any) => (
              <span key={comment} className="">
                <li style={{ listStyle: "none" }} key={comment}>
                  {comment?.comment !== undefined && comment.comment !== "" && (
                    <div className="">
                      <div className="">
                        <CommentOutlined className="text-xl text-sky-700" />{" "}
                        Reviews and Ratings:
                      </div>
                      <div className="flex flex-row py-1">
                        <ArrowRightOutlined />
                        {comment.comment}
                      </div>
                    </div>
                  )}
                </li>
              </span>
            ))}
          </ul>
          <div className="max-w-fit mt-5">
            <Button
              label="Book an Appointment"
              onClick={() => {
                setOpen(true);
                setListingId(data?.id);
              }}
            />

            {/* <Button
              label="Login to Book a Service"
              onClick={() => push("/login")}
            /> */}
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
                {/* <FormInput
                  name="days"
                  type="number"
                  size="large"
                  label="Total days"
                  placeholder="Total days"
                  required
                  disabled
                /> */}
              </div>
            </Form>
          </div>
        ) : (
          <p onClick={() => push("/login")}>
            Please <span className="text-red-500 cursor-pointer">login </span>{" "}
            to Book a Service
          </p>
        )}
      </UMModal>

      {/* Review and ratings */}
      <div
        id="reviewForm"
        className="border p-4 flex flex-col items-start md:w-1/3 mt-20 md:mt-72"
      >
        <h3 className="text-xl py-2 md:text-2xl">
          Make your valuable comment here:
        </h3>
        <Form submitHandler={onSubmitReview}>
          <div className="flex items-start justify-center gap-3">
            <div className="">
              <FormInput
                type="text"
                name="comment"
                placeholder="Write your review"
                required
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="rounded-full bg-sky-500 h-12 w-12 md:h-18 md:w-18  md:text-[25px] hover:opacity-75"
                type="submit"
              >
                <SendOutlined className="text-white" />
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SingleService;
