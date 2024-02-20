"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Button from "@/components/ui/Button";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddCarMutation } from "@/redux/api/carListingApi";
import { Col, Row, message } from "antd";

const CreateCarPage = () => {
  const [addCar] = useAddCarMutation();

  const onSubmit = async (data: any) => {
    data.price = parseInt(data?.price);

    message.loading("Creating.....");
    // console.log(data);
    try {
      const res = await addCar(data).unwrap();
      if (res?.id) {
        message.success("Cars created successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "car-listings", link: `/${base}/car-listings` },
        ]}
      />
      <h1>Create Car</h1>
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
        <Form submitHandler={onSubmit}>
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
          <div className="max-w-fit hover:opacity-40">
            <Button label="Add" className="" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCarPage;
