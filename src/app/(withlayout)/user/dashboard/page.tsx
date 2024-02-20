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
import { message } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const UserDashboard = () => {
  const loggedInUser = getUserInfo() as any;
  // console.log(verifiedUser);

  const { data, isLoading } = useAppointmentsQuery({ limit: 100, page: 1 });
  // console.log(data);

  const [deleteAppointment] = useDeleteAppointmentMutation();

  // Find loggedInUser appointments
  const loggedInUserAppointments = data?.appointments?.filter(
    (item) => item.userId === loggedInUser.id
  );
  // console.log(loggedInUserAppointments);

  const appointment = data?.appointments;
  const meta = data?.meta;

  const user = data?.appointments?.map((item: any) => {
    // console.log("item", item);
    const user = item.user;
    return user;
  });

  //find Reserved cars
  const carListings = appointment?.map((item: any) => {
    // console.log(item);
    const listing = item.listing;
    return {
      label: listing,
      value: item.id,
    };
  });

  const loggedInUserCars = loggedInUserAppointments?.map((reservation) => {
    const loggedInUserCar = carListings?.find(
      (item) => item.value === reservation.id
    );

    return loggedInUserCar;
  });

  // console.log(loggedInUserCars);

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

  const columns1 = [
    {
      title: "Image",
      dataIndex: "imgUrl",
      render: (imgUrl: any) => (
        <Image src={imgUrl} alt="Car Image" height={100} width={100} />
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
    // {
    //   title: "description",
    //   dataIndex: "description",
    //   key: "description",
    // },
  ];

  const columns = [
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (data: any, record: { id: string }) => {
    //     const matchingCarListing = carListing?.find(
    //       (item) => item.value === record.id
    //     );

    //     if (matchingCarListing) {
    //       return matchingCarListing.label;
    //     }
    //     return data;
    //   },
    //   sorter: true,
    // },
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
          <div className="flex gap-2">
            <Link href={`/user/my-appointments/detail/${data?.id}`}>
              <div

              // onClick={() => console.log(data)}
              >
                <EyeOutlined className="text-sky-700 text-2xl hover:opacity-70" />
              </div>
            </Link>
            <div onClick={() => deleteHandler(data?.id)}>
              <DeleteOutlined className="text-sky-700 text-2xl hover:opacity-70" />
            </div>
          </div>
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

      <div className="overflow-x-auto bg-white py-14">
        <ActionBar title="Reserved Car Details:"></ActionBar>
        <UMTable
          loading={isLoading}
          columns={columns1}
          dataSource={loggedInUserCars?.map((car) => ({
            imgUrl: car?.label?.imgUrl,
            name: car?.label?.name,
            price: car?.label?.price,
            category: car?.label?.category,
            description: car?.label?.description,
          }))}
          totalPages={meta?.total}
          showSizeChanger={true}
          showPagination={true}
        />
      </div>
      <div className="overflow-x-auto bg-white">
        <ActionBar title="Reservation Detail:"></ActionBar>
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={loggedInUserAppointments}
          totalPages={meta?.total}
          showSizeChanger={true}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
