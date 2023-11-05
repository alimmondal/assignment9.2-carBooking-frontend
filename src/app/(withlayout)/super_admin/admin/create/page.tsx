"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";

import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { loginSchema } from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
// import loginImage from "../../../assets/login-image.png";

const AdminRegisterPage = () => {
  const [addAdminWithFormData] = useAddAdminWithFormDataMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    console.log(values);
    // const obj = { ...values };
    // const file = obj["file"];
    // delete obj["file"];
    // const data = JSON.stringify(obj);
    // const formData = new FormData();
    // formData.append("file", file as Blob);
    // formData.append("data", data);
    // message.loading("Creating...");
    try {
      const res = await addAdminWithFormData(values);
      if (res) {
        message.success("User created successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col> */}
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          First register and then login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                name="fullName"
                type="text"
                size="large"
                label="Full Name"
                required
              />
            </div>
            <div>
              <FormInput
                name="email"
                type="email"
                size="large"
                label="Email"
                required
              />
            </div>
            <div>
              <FormInput
                name="phoneNumber"
                type="text"
                size="large"
                label="Phone Number"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
              />
            </div>
            <div>
              <FormInput
                name="role"
                type="text"
                size="large"
                label="Role"
                required
              />
            </div>
            <div>
              <FormInput
                name="address"
                type="text"
                size="large"
                label="Address"
                required
              />
            </div>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default AdminRegisterPage;
