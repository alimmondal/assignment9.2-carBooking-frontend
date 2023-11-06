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
  // console.log(userAppointments);

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

  const reservation = appointment?.map((item) => {
    // console.log(item);
    const listing = item.listing;
    return listing;
  });
  // console.log(reservation);

  const verifiedCar = reservation?.find((item) => item?.id === loggedInUser.id);
  // console.log(verifiedCar);

  const user = appointment?.map((item: any) => {
    // console.log(item);
    const user = item.user;
    return user;
  });

  // @ts-ignore
  const verifiedInUser = user?.filter((item) => item?.id === loggedInUser.id);
  // console.log(user);

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
              Cancel Appointment
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

      <h2>Reserved Car Details:</h2>
      {reservation && reservation.length > 0 && (
        <div style={{ margin: "50px 0" }}>
          {reservation?.map((item: any) => (
            <div key={item.id}>
              <Image
                src={item?.imgUrl}
                width={100}
                height={100}
                alt="booking-car-image"
              />
              <h4>Name: {item?.name}</h4>
              <h4>Description: {item?.description}</h4>
              <h4>Category: {item?.category}</h4>
            </div>
          ))}
        </div>
      )}

      <ActionBar title="Reservation Detail"></ActionBar>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={loggedInUserAppointments}
        // pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        // onPaginationChange={onPaginationChange}
        // onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default UserDashboard;
