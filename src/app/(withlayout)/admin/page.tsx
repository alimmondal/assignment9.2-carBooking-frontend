"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAdminQuery } from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";

const AdminPage = () => {
  const loggedInUser = getUserInfo() as any;
  // console.log(verifiedUser);

  const { data, isLoading } = useAdminQuery(loggedInUser.id);
  // console.log(data);
  const id = data?.id;

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "Profile",
            link: "/profile",
          },
          {
            label: "Car-List",
            link: "/admin/car-listings",
          },
          {
            label: "Manage-appointments",
            link: "/admin/manage-appointments",
          },
        ]}
      />

      <div style={{ margin: "50px 0" }}>
        <h2>Profile details:</h2>

        <div>
          {data?.imgSrc ? (
            <Image
              src={data?.imgSrc}
              alt="profile image"
              width={100}
              height={100}
            />
          ) : (
            <UserOutlined style={{ fontSize: "100px" }} />
          )}
          <h4>Full Name: {data?.fullName}</h4>
          <h4>Full Name: {data?.phoneNumber}</h4>
          <h4>Email: {data?.email}</h4>
          <h4>Address: {data?.address}</h4>
          <Button
            type="primary"
            style={{ margin: "15px 0" }}
            href={`/admin/edit/${id}`}
          >
            Edit your profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
