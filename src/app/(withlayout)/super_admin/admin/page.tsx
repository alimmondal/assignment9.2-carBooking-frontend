"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMModal from "@/components/ui/UMModal";
import UMTable from "@/components/ui/UMTable";
import { useAdminsQuery, useDeleteAdminMutation } from "@/redux/api/adminApi";
import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const AdminPage = () => {
  const query: Record<string, any> = {};
  const [deleteAdmin] = useDeleteAdminMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useAdminsQuery({ ...query });
  // console.log(data);

  const admins = data?.admins;
  const meta = data?.meta;

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    // {
    //   title: "Created at",
    //   dataIndex: "createdAt",
    //   render: function (data: any) {
    //     return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    //   },
    //   sorter: true,
    // },
    {
      title: "Contact no.",
      dataIndex: "phoneNumber",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        // console.log(data);
        return (
          <div className="flex gap-2">
            <Link href={`/super_admin/admin/detail/${data}`}>
              <div onClick={() => console.log(data)}>
                <EyeOutlined className="text-sky-700 text-xl hover:opacity-70" />
              </div>
            </Link>
            <Link href={`/super_admin/admin/edit/${data}`}>
              <div
              // onClick={() => console.log(data)}
              >
                <EditOutlined className="text-sky-700 text-xl hover:opacity-70" />
              </div>
            </Link>
            <div
              onClick={() => {
                setOpen(true);
                setAdminId(data);
              }}
            >
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

  const deleteAdminHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteAdmin(id);
      if (res) {
        message.success("Admin Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
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
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />
      <ActionBar title="Admin List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 md:w-1/5"
        />
        <div className="flex gap-2">
          <Link href="/super_admin/admin/create">
            <div className="bg-sky-700  px-2 py-1">
              <p className="md:text-xl text-white">Create Admin</p>
            </div>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <div
              className="bg-sky-700 text-white px-2 py-1"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </div>
          )}
        </div>
      </ActionBar>
      <div className="bg-white overflow-x-auto">
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={admins}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>

      <UMModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteAdminHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal>
    </div>
  );
};

export default AdminPage;
