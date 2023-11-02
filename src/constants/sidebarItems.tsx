import {
  AppstoreOutlined,
  CreditCardOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TableOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/profile`}>Profile</Link>,
      key: "profile",
      icon: <ProfileOutlined />,
      // children: [
      //   {
      //     label: <Link href={`/${role}`}>Account Profile</Link>,
      //     key: `/${role}/profile`,
      //   },
      //   {
      //     label: <Link href={`/${role}/change-password`}>Change Password</Link>,
      //     key: `/${role}/change-password`,
      //   },
      // ],
    },
  ];

  // const commonAdminSidebarItems: MenuProps["items"] = [
  //   {
  //     label: <Link href={`/${role}/manage-student`}>Manage Students</Link>,
  //     icon: <TableOutlined />,
  //     key: `/${role}/manage-student`,
  //   },
  //   {
  //     label: <Link href={`/${role}/manage-faculty`}>Manage Faculty</Link>,
  //     icon: <TableOutlined />,
  //     key: `/${role}/manage-faculty`,
  //   },
  // ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,

    {
      label: "Admin Dashboard",
      key: "Admin Dashboard",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/car-listings`}>Car management</Link>,
          key: `/${role}/car-listings`,
        },
        {
          label: (
            <Link href={`/${role}/manage-appointments`}>
              Manage appointments
            </Link>
          ),
          key: `/${role}/manage-appointments`,
        },
        {
          label: <Link href={`/${role}`}>Profile setting</Link>,
          key: `/${role}/offered-course`,
          icon: <SettingOutlined rotate={180} spin={true} />,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
      ],
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: "User Dashboard",
      key: "User Dashboard",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/dashboard`}>dashboard</Link>,
          icon: <TableOutlined />,
          key: `/${role}/dashboard`,
        },
        {
          label: <Link href={`/${role}/my-profile`}>profile-settings</Link>,
          icon: <ScheduleOutlined />,
          key: `/${role}/my-profile`,
        },
        {
          label: (
            <Link href={`/${role}/my-appointments`}>Manage-appointment</Link>
          ),
          icon: <ThunderboltOutlined />,
          key: `/${role}/my-appointments`,
        },
        {
          label: <Link href={`/${role}/payment-history`}>Payment-history</Link>,
          icon: <CreditCardOutlined />,
          key: `/${role}/payment-history`,
        },
      ],
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  // else if (role === USER_ROLE.FACULTY) return facultySidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
