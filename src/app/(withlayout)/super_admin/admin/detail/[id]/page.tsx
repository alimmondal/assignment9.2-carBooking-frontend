"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAdminQuery } from "@/redux/api/adminApi";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";

interface IProps {
  params: any;
}
const AdminDetailPage = ({ params }: IProps) => {
  const { id } = params;
  const { data, isLoading } = useAdminQuery(id);
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
      <div className="my-5 w-full flex flex-col items-center justify-center">
        <h2>Admin Details</h2>
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

export default AdminDetailPage;
