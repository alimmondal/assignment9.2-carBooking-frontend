"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useUserQuery } from "@/redux/api/userApi";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";

interface IProps {
  params: any;
}
const UserDetailPage = ({ params }: IProps) => {
  const { id } = params;
  const { data, isLoading } = useUserQuery(id);
  //   console.log(data);

  return (
    <>
      <UMBreadCrumb
        items={[
          {
            label: "Manage-admin",
            link: "/super_admin/admin",
          },
        ]}
      />
      <h2>User Details</h2>
      <div className="my-5">
        {data?.imgUrl ? (
          <Image src={data?.imgUrl} alt="user image" width={100} height={100} />
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
      </div>
    </>
  );
};

export default UserDetailPage;
