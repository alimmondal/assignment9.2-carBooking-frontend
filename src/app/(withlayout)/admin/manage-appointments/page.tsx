"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import {
  CheckOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import ActionBar from "@/components/ui/ActionBar";
import {
  useAppointmentsQuery,
  useApproveAppointmentMutation,
  useCancelAppointmentMutation,
} from "@/redux/api/appointmentApi";
import { useDebounced } from "@/redux/hooks";
import { Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ManageAppointments = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [approveAppointment] = useApproveAppointmentMutation();
  const [cancelAppointment] = useCancelAppointmentMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useAppointmentsQuery({ ...query });
  // console.log("carListings", data);

  const appointment = data?.appointments;
  const meta = data?.meta;

  const carListing = appointment?.map((item: any) => {
    // console.log(item.id);
    const listing = item.listing;
    return {
      label: listing?.name,
      value: item.id,
    };
  });

  const item = appointment?.map((item: any) => {
    return item.id;
  });
  // console.log(item);

  const appointmentCancelHandler = async (id: string, values: any) => {
    message.loading("approving.....");
    try {
      console.log(id);
      const res = await cancelAppointment({ id, body: values });
      if (res) {
        message.success("Appointment approved successfully");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const appointmentApproveHandler = async (id: string, values: any) => {
    message.loading("approving.....");
    try {
      console.log(id);
      const res = await approveAppointment({ id, body: values });
      if (res) {
        message.success("Appointment approved successfully");
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
    // {
    //   title: "Reservation date",
    //   dataIndex: "createdAt",
    //   render: function (data: any) {
    //     return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    //   },
    //   sorter: true,
    // },
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
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex gap-2">
            <Link href={`/admin/manage-appointments/detail/${data?.id}`}>
              <div onClick={() => console.log(data)}>
                <EyeOutlined className="text-sky-700 text-2xl hover:opacity-70" />
              </div>
            </Link>
            <div
              // @ts-ignore
              onClick={() => appointmentApproveHandler(data?.id, item?.status)}
            >
              <CheckOutlined className="text-sky-700 text-2xl hover:opacity-70" />
            </div>
            <div
              // @ts-ignore
              onClick={() => appointmentCancelHandler(data?.id, item?.status)}
            >
              <CloseCircleOutlined className="text-sky-700 text-2xl hover:opacity-70" />{" "}
            </div>
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div className="overflow-hidden">
      <UMBreadCrumb
        items={[
          {
            label: "Profile",
            link: "/profile",
          },
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "Car-List",
            link: "/admin/car-listings",
          },
        ]}
      />

      <ActionBar title="Appointments List">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          className="w-1/2 md:w-1/5"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className="flex gap-2">
          <Link href="/admin/car-listings/create">
            <div className="bg-sky-700 text-white text-2xl px-2">Create</div>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <div onClick={resetFilters} className="bg-sky-700 text-white px-2">
              <ReloadOutlined className="text-white text-2xl hover:opacity-70 px-2 py-1" />
            </div>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={appointment}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageAppointments;
