"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Button from "@/components/ui/Button";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { Col, Row, message } from "antd";

type IDProps = {
  params: any;
};

const EditAdminProfile = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useAdminQuery(id);
  // console.log(data);
  const [updateAdmin] = useUpdateAdminMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);
    try {
      const res = await updateAdmin({ id: data?.id, body: values });
      if (res) {
        // router.push("/login");
        message.success("Admin updated successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    fullName: data?.fullName || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
    // password: data?.password || "",
    // address: data?.address || "",
    imgSrc: data?.imgSrc || "",
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "My-Profile",
            link: "/admin",
          },
        ]}
      />
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
          <h3 className="text-md md:text-2xl">Update your profile</h3>
          <div>
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
                />
              </div>

              {/* <div
              style={{
                margin: "10px 0",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
              />
            </div> */}

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
              {/* <div
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
              </div> */}
              <div
                style={{
                  margin: "10px 0",
                }}
              >
                <FormInput
                  name="imgSrc"
                  type="text"
                  size="large"
                  label="Image Url"
                  disabled={true}
                />
              </div>
              <Button className="max-w-fit md:text-2xl" small label="Update" />
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EditAdminProfile;
