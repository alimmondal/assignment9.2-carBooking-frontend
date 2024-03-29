"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMModal from "@/components/ui/UMModal";
import UMTable from "@/components/ui/UMTable";
import { useDeleteUserMutation, useUsersQuery } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import { DeleteOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageUsersPage = () => {
  const query: Record<string, any> = {};
  const [deleteUser] = useDeleteUserMutation();

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
  const { data, isLoading } = useUsersQuery({ ...query });
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
            <Link href={`/admin/manage-users/detail/${data}`}>
              <div onClick={() => console.log(data)}>
                <EyeOutlined className="text-sky-700 text-2xl hover:opacity-70" />
              </div>
            </Link>
            {/* <Link href={`/admin/manage-users/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link> */}
            <div
              onClick={() => {
                setOpen(true);
                setAdminId(data);
              }}
            >
              <DeleteOutlined className="text-rose-700 text-2xl hover:opacity-70" />
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

  const deleteUserHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteUser(id);
      if (res) {
        message.success("User Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
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
      <ActionBar title="Users List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 md:w-1/5"
        />
        <div>
          {/* <Link href="/admin/manage-users/create">
            <Button type="primary">Create Admin</Button>
          </Link> */}
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
        title="Remove user"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteUserHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this User?</p>
      </UMModal>
    </div>
  );
};

export default ManageUsersPage;
