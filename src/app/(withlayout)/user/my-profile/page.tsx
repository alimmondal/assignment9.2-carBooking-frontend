"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";

const MyProfile = () => {
  const loggedInUser = getUserInfo() as any;
  // console.log(verifiedUser);

  const { data, isLoading } = useUserQuery(loggedInUser.id);
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
        ]}
      />

      <div style={{ margin: "50px 0" }}>
        <h1>Profile details:</h1>

        <div>
          {data?.imgSrc ? (
            <Image
              src={data?.imgSrc}
              alt="profile-image"
              width={100}
              height={100}
            />
          ) : (
            <UserOutlined style={{ fontSize: "100px" }} />
          )}
          <h4>Full Name: {data?.fullName}</h4>
          <h4>Email: {data?.email}</h4>
          <h4>Address: {data?.address}</h4>
          <Button
            type="primary"
            style={{ margin: "15px 0" }}
            href={`/user/my-profile/edit/${id}`}
          >
            Edit your profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
