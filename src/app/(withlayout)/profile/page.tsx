"use client";
import { getUserInfo } from "@/services/auth.service";

const ProfilePage = () => {
  const data = getUserInfo() as any;
  // console.log(data);
  return (
    <div>
      <h1 className="py-5">Welcome back to your profile</h1>
      <h3>Name: {data?.fullName}</h3>
      <h3>Your role: {data?.role}</h3>
      <h3>Email: {data?.email}</h3>
      <h3>Phone Number: {data?.phoneNumber}</h3>
    </div>
  );
};

export default ProfilePage;
