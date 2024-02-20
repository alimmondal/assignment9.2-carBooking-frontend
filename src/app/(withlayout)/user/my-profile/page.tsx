"use client";
import Button from "@/components/ui/Button";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
// import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { push } = useRouter();
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

      <div className="">
        <div className="my-5 w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl">User Profile Details</h2>
          {data?.imgUrl ? (
            <Image
              src={data?.imgUrl}
              alt="user image"
              width={100}
              height={100}
            />
          ) : (
            <UserOutlined style={{ fontSize: "100px" }} />
          )}
          <p className="py-1">
            <span className="font-bold">Name: </span> {data?.fullName}
          </p>
          <p>
            <span className="font-bold">Phone Number: </span>
            {data?.phoneNumber}
          </p>
          <p className="py-1">
            <span className="font-bold">Email: </span> {data?.email}
          </p>
          <p>
            <span className="font-bold">Address: </span>
            {data?.address}
          </p>
          <Button
            className="max-w-fit mt-5"
            small
            label="Edit your profile"
            onClick={() => push("/user/my-profile/edit/${id}")}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
