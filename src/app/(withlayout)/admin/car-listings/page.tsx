"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import ActionBar from "@/components/ui/ActionBar";
import {
  useCarListingsQuery,
  useDeleteCarMutation,
} from "@/redux/api/carListingApi";
import { useDebounced } from "@/redux/hooks";
import { Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const CarListingPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteCar] = useDeleteCarMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useCarListingsQuery({ ...query });
  // console.log("carListings", data);

  const cars = data?.cars;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      // console.log(id);
      const res = await deleteCar(id);
      if (res) {
        message.success("Car Deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
    },
    // {
    //   title: "CreatedAt",
    //   dataIndex: "createdAt",
    //   render: function (data: any) {
    //     return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    //   },
    //   sorter: true,
    // },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex items-center justify-start gap-2">
            <Link href={`/admin/car-listings/detail/${data?.id}`}>
              <div onClick={() => console.log(data)}>
                <EyeOutlined className="text-sky-700 text-xl hover:opacity-70" />
              </div>
            </Link>
            <Link href={`/admin/car-listings/edit/${data?.id}`}>
              <div onClick={() => console.log(data)}>
                <EditOutlined className="text-sky-700 text-xl hover:opacity-70" />
              </div>
            </Link>
            <div onClick={() => deleteHandler(data?.id)}>
              <DeleteOutlined className="text-rose-700 text-xl hover:opacity-70" />
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
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "Profile",
            link: "/profile",
          },
          {
            label: "Manage-appointments",
            link: "/admin/manage-appointments",
          },
        ]}
      />

      <ActionBar title="Car List">
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
            <div className="bg-sky-700 text-white px-2">Create</div>
          </Link>

          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <div
              className="bg-sky-700 text-white px-2 py-1"
              onClick={resetFilters}
            >
              <ReloadOutlined className="hover:opacity-70" />
            </div>
          )}
        </div>
      </ActionBar>

      <div className="bg-white overflow-x-auto">
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={cars}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default CarListingPage;
