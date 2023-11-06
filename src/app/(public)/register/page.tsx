"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useAddUserWithFormDataMutation } from "@/redux/api/userApi";
import { loginSchema } from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

// type FormValues = {
//   id: string;
//   password: string;
// };

const RegisterPage = () => {
  const [addUserWithFormData] = useAddUserWithFormDataMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    // console.log(values);

    // const obj = { ...values };
    // const file = obj["file"];
    // delete obj["file"];
    // const data = JSON.stringify(obj);
    // const formData = new FormData();
    // formData.append("file", file as Blob);
    // formData.append("data", data);
    // message.loading("Creating...");

    try {
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
            <Button
              style={{
                margin: "10px 0",
              }}
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
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
