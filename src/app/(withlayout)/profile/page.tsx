"use client";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";

const ProfilePage = () => {
  const data = getUserInfo() as any;
  // console.log(data);
  return (
    <div>
      <h1>Welcome back to your profile</h1>
      <h2>Name: {data?.fullName}</h2>
      <h2>Email: {data?.email}</h2>
      <h2>Phone Number: {data?.phoneNumber}</h2>
      {/* <h3>Address: {data?.address}</h3> */}
      {data.role == "user" && (
        <Button
          type="primary"
          style={{ margin: "30px 0" }}
          href="/user/dashboard"
        >
          View Details
        </Button>
      )}
    </div>
  );
};

export default ProfilePage;
