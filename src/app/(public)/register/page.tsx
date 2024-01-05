"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Button from "@/components/ui/Button";
import { useAddUserWithFormDataMutation } from "@/redux/api/userApi";
import { loginSchema } from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

// type FormValues = {
//   id: string;
//   password: string;
// };

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addUserWithFormData] = useAddUserWithFormDataMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    // console.log(values);

    try {
      setIsLoading(true);
      const res = await addUserWithFormData(values);
      if (res) {
        router.push("/login");
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
        <h3
          style={{
            margin: "15px 0px",
          }}
        >
          First register and then login your account
        </h3>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <FormInput
                name="fullName"
                type="text"
                size="large"
                label="Full Name"
                required
              />
            </div>
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <FormInput
                name="email"
                type="email"
                size="large"
                label="Email"
                required
                placeholder="Enter your email address"
              />
            </div>
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <FormInput
                name="phoneNumber"
                type="text"
                size="large"
                label="Phone Number"
                placeholder="Phone Number"
              />
            </div>
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
                placeholder="password must be at least 6 characters"
              />
            </div>
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <FormInput
                name="role"
                type="text"
                size="large"
                label="Role"
                placeholder="Your role is user"
                disabled={true}
              />
            </div>
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <FormInput
                name="imgSrc"
                type="text"
                size="large"
                label="Provide valid image url or keep empty"
                placeholder="Image url"
                disabled={true}
              />
            </div>
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <FormInput
                name="address"
                type="text"
                size="large"
                label="Address"
                placeholder="Your role is user"
              />
            </div>
            {/* <Button
              style={{
                margin: "10px 0",
              }}
              type="primary"
              htmlType="submit"
            >
              Register
            </Button> */}
            <Button label={isLoading ? "Loading..." : "Register"} />
          </Form>
        </div>
        Have an account?
        <a
          href={"/login"}
          style={{
            margin: "10px 0",
          }}
        >
          Login
        </a>
      </Col>
    </Row>
  );
};

export default RegisterPage;
