"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import ActionBar from "@/components/ui/ActionBar";
import {
  useAppointmentsQuery,
  useDeleteAppointmentMutation,
} from "@/redux/api/appointmentApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const UserDashboard = () => {
  const loggedInUser = getUserInfo() as any;
  // console.log(verifiedUser);

  const { data, isLoading } = useAppointmentsQuery({ limit: 100, page: 1 });
  // console.log(data);

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const loggedInUserAppointments = data?.appointments?.filter(
    (item) => item.userId === loggedInUser.id
  );
  console.log(loggedInUserAppointments);

  const appointment = data?.appointments;
  const meta = data?.meta;

  const carListing = appointment?.map((item) => {
    // console.log(item);
    const listing = item.listing;
    return {
      label: listing?.name,
      value: item.id,
    };
  });

  const user = appointment?.map((item: any) => {
    // console.log(item);
    const user = item.user;
    return user;
  });

  // @ts-ignore
  const verifiedInUser = user?.filter((item) => item?.id === loggedInUser.id);

  //find Reserved cars
  const carListings = appointment?.map((item: any) => {
    // console.log(item);
    const listing = item.listing;
    return {
      label: listing,
      value: item.id,
    };
  });

  const loggedInUserReservation = loggedInUserAppointments?.[0];

  const loggedInUserCar = carListings?.find(
    (item: any) => item.value === loggedInUserReservation?.id
  );
  console.log(loggedInUserCar);

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      console.log(data);
      const res = await deleteAppointment(id);
      if (res) {
        message.success("Car Deleted successfully");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const carData = [
    {
      imgUrl: loggedInUserCar?.label?.imgUrl,
      name: loggedInUserCar?.label?.name,
      price: loggedInUserCar?.label?.price,
      category: loggedInUserCar?.label?.category,
      description: loggedInUserCar?.label?.description,
    },
  ];

  const columns1 = [
    {
      title: "Image",
      dataIndex: "imgUrl", // Assuming "image" is the property in your appointment data
      render: (imgUrl: any) => (
        <Image
          src={imgUrl}
          alt="Car Image"
          height={100}
          width={100}
          // style={{ width: "100px", height: "100px" }}
        />
      ),
      key: "imgUrl",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (data: any, record: { id: string }) => {
        const matchingCarListing = carListing?.find(
          (item) => item.value === record.id
        );

        if (matchingCarListing) {
          return matchingCarListing.label;
        }
        return data;
      },
      sorter: true,
    },
    {
      title: "Reservation date",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "End date",
      dataIndex: "endDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/user/my-appointments/detail/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                // onClick={() => console.log(data)}
                type="primary"
              >
                details
                <EyeOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              Cancel
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "Profile",
            link: "/profile",
          },
          {
            label: "My-Appointments",
            link: "/users/my-appointments",
          },
        ]}
      />

      {verifiedInUser && verifiedInUser.length > 0 && (
        <div style={{ margin: "50px 0" }}>
          <h1>Profile details:</h1>
          {verifiedInUser?.map((item: any) => (
            <div key={item.id}>
              <h4>Full Name: {item?.fullName}</h4>
              <h4>Email: {item?.email}</h4>
              <h4>Address: {item?.address}</h4>
            </div>
          ))}
        </div>
      )}

      <ActionBar title="Reserved Car Details:"></ActionBar>
      <UMTable
        loading={isLoading}
        columns={columns1}
        dataSource={carData}
        totalPages={meta?.total}
        showSizeChanger={true}
        showPagination={true}
      />

      <ActionBar title="Reservation Detail"></ActionBar>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={loggedInUserAppointments}
        totalPages={meta?.total}
        showSizeChanger={true}
        showPagination={true}
      />
    </div>
  );
};

export default UserDashboard;
