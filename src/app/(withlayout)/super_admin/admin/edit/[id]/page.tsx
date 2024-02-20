"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Button from "@/components/ui/Button";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";

import { Col, Row, message } from "antd";

const EditAdminPage = ({ params }: any) => {
  // console.log("params", params);
  const { data, isLoading } = useAdminQuery(params?.id);
  // console.log(data);
  const [updateAdmin] = useUpdateAdminMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await updateAdmin({ id: params?.id, body: values }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Admin Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    fullName: data?.fullName || "",
    email: data?.email || "",
    role: data?.role || "",
    address: data?.address || "",
    imgSrc: data?.imgSrc || "",
    phoneNumber: data?.phoneNumber || "",
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "Profile",
            link: "/profile",
          },
          {
            label: "Manage-admin",
            link: "/super_admin/admin",
          },
        ]}
      />

      <div>
        <Row
          justify="center"
          align="middle"
          style={{
            minHeight: "100vh",
          }}
        >
          <Col sm={12} md={8} lg={8}>
            <h1
              style={{
                margin: "15px 0px",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              Edit Admin
            </h1>
            <div>
              <Form
                submitHandler={onSubmit}
                defaultValues={defaultValues}
                // resolver={yupResolver(loginSchema)}
              >
                <div>
                  <FormInput
                    name="fullName"
                    type="text"
                    size="large"
                    label="Full Name"
                    required
                  />
                </div>
                <div className="mt-1">
                  <FormInput
                    name="email"
                    type="email"
                    size="large"
                    label="Email"
                    required
                  />
                </div>
                <div className="mt-1">
                  <FormInput
                    name="phoneNumber"
                    type="text"
                    size="large"
                    label="Phone Number"
                  />
                </div>

                <div className="mt-1">
                  <FormInput
                    name="role"
                    type="text"
                    size="large"
                    label="Role"
                    required
                  />
                </div>
                <div className="mt-1">
                  <FormInput
                    name="address"
                    type="text"
                    size="large"
                    label="Address"
                    required
                  />
                </div>
                <div className="max-w-fit">
                  <Button label="Edit" small className="mt-3" />
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EditAdminPage;
