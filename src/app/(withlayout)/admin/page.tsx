"use client";
import Button from "@/components/ui/Button";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAdminQuery } from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
// import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { push } = useRouter();
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

      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl">Admin Profile:</h2>
        <div>
          <div className="my-5">
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
          </div>
          <div className="">
            <h4>
              <span className="font-semibold">Full Name:</span> {data?.fullName}
            </h4>
            <h4>
              <span className="font-semibold">Full Name:</span>
              {data?.phoneNumber}
            </h4>
            <h4>
              <span className="font-semibold">Email:</span> {data?.email}
            </h4>
            <h4>
              <span className="font-semibold">Address:</span> {data?.address}
            </h4>
          </div>

          <Button
            className="max-w-fit mt-5"
            small
            label="Edit your profile"
            onClick={() => push("/admin/edit/${id}")}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
