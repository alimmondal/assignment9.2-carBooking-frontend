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
import Link from "next/link";

const UserManageAppointment = () => {
  const verifiedUser = getUserInfo() as any;
  // console.log(verifiedUser);

  const { data, isLoading } = useAppointmentsQuery({ limit: 100, page: 1 });
  // console.log(data);

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const userAppointments = data?.appointments?.filter(
    (item) => item.userId === verifiedUser.id
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
  // console.log(carListing);

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

      <ActionBar title="Appointment List"></ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={userAppointments}
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

export default UserManageAppointment;
