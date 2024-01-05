"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { loginSchema } from "@/schemas/login";
import { storeUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../assets/login-image.png";
import Button from "../ui/Button";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await userLogin({ ...data }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
        router.push("/profile");
        message.success("User logged in successfully!");
        storeUserInfo({ accessToken: res?.accessToken });
      }
      // console.log(res);
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
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h4>Login Information:</h4>
        <p>super-admin: superAdmin@gmail.com</p>
        <p>admin: admin@gmail.com</p>
        <p>super-admin: user1@gmail.com</p>
        <p>password: 123456</p>
        <h2
          style={{
            margin: "15px 0px",
          }}
        >
          First register and then login your account
        </h2>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                name="email"
                type="text"
                size="large"
                label="Email"
                required
              />
            </div>
            <div
              style={{
                margin: "20px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
                required
              />
            </div>
            {/* <Button type="primary" htmlType="submit">
              Login
            </Button> */}
            <Button label={isLoading ? "Loading..." : "Login"} />
          </Form>
        </div>
        Do not have an account? <a href={"/register"}> Register</a>
      </Col>
    </Row>
  );
};

export default LoginPage;
