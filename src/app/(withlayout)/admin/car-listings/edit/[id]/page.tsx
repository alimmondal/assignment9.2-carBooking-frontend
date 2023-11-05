"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useCarListingQuery,
  useUpdateCarMutation,
} from "@/redux/api/carListingApi";
import { Button, Col, Row, message } from "antd";

type ICarProps = {
  params: any;
};

const SingleCarEditPage = ({ params }: ICarProps) => {
  const { id } = params;
  const [updateCar] = useUpdateCarMutation();
  const { data, isLoading } = useCarListingQuery(id);

  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating.....");
    try {
      //   console.log(data);
      await updateCar({ id, body: values });
      message.success("Car's data updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    name: data?.name || "",
    category: data?.category || "",
    price: data?.price || "",
    // comments: data?.comments || "",
    description: data?.description || "",
    imgUrl: data?.imgUrl || "",
  };
  const base = "admin";
  return (
    <div>
      {/* <h1>Single Car edit Page</h1> */}
      <div>
        <UMBreadCrumb
          items={[
            { label: `${base}`, link: `/${base}` },
            { label: "car-listings", link: `/${base}/car-listings` },
          ]}
        />
        <h1>Edit Car</h1>
        <div
          className=""
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput name="name" label="Name" placeholder="Car Name" />
                </div>
              </Col>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    name="description"
                    label="Description"
                    placeholder="Description of the car"
                  />
                </div>
              </Col>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="number"
                    name="price"
                    label="Price"
                    placeholder="Price"
                    required
                  />
                </div>
              </Col>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="text"
                    name="category"
                    label="Category"
                    placeholder="Category like Avis/ Sixt/ Alamo"
                    required
                  />
                </div>
              </Col>

              {/* <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="text"
                    name="comments"
                    label="comments"
                    placeholder="Keep it empty"

                  />
                </div>
              </Col> */}

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    name="imgUrl"
                    label="Image Url"
                    placeholder="Provide a valid URL"
                  />
                </div>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SingleCarEditPage;
