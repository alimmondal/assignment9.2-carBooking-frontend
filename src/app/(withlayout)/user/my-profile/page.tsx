"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Image from "next/image";

const MyProfile = () => {
  const loggedInUser = getUserInfo() as any;
  // console.log(verifiedUser);

  const { data, isLoading } = useUserQuery(loggedInUser.id);
  // console.log(data);
  const id = data?.id;

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "fullName",
  //     sorter: true,
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     sorter: true,
  //   },
  //   {
  //     title: "Create date",
  //     dataIndex: "createdAt",
  //     render: function (data: any) {
  //       return data && dayjs(data).format("MMM D, YYYY hh:mm A");
  //     },
  //     sorter: true,
  //   },

  //   {
  //     title: "Action",
  //     render: function (data: any) {
  //       return (
  //         <>
  //           <Link href={`/user/my-appointments/detail/${data?.id}`}>
  //             <Button
  //               style={{
  //                 margin: "0px 5px",
  //               }}
  //               // onClick={() => console.log(data)}
  //               type="primary"
  //             >
  //               details
  //               <EyeOutlined />
  //             </Button>
  //           </Link>
  //         </>
  //       );
  //     },
  //   },
  // ];

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
          <Image
            src={data?.imgSrc}
            alt="profile image"
            width={100}
            height={100}
          />
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

      {/* <ActionBar title="User Detail"></ActionBar>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        // pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        showPagination={true}
      /> */}
    </div>
  );
};

export default MyProfile;
