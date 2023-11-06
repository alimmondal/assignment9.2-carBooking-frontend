import {
  AppstoreOutlined,
  CreditCardOutlined,
  HighlightOutlined,
  ProfileOutlined,
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
      //     key: `/${role}`,
      //   },
      //   {
      //     label: <Link href={`/${role}/change-password`}>Change Password</Link>,
      //     key: `/${role}/change-password`,
      //   },
      // ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,

    {
      label: "Admin Dashboard",
      key: "Admin Dashboard",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/car-listings`}>Car-management</Link>,
          key: `/${role}/car-listings`,
          icon: <HighlightOutlined />,
        },
        {
          label: (
            <Link href={`/${role}/manage-appointments`}>
              Manage-appointments
            </Link>
          ),
          key: `/${role}/manage-appointments`,
          icon: <HighlightOutlined />,
        },
        {
          label: <Link href={`/${role}/manage-users`}>Manage-users</Link>,
          key: `/${role}/manage-users`,
          icon: <HighlightOutlined />,
        },
        {
          label: <Link href={`/${role}`}>Profile-setting</Link>,
          key: `/${role}`,
          icon: <SettingOutlined rotate={180} spin={true} />,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,

    {
      label: "Super-Admin-Dashboard",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account-settings</Link>,
          key: `/${role}`,
          icon: <SettingOutlined rotate={180} spin={true} />,
        },
        {
          label: <Link href={`/${role}/admin`}>Manage-admin</Link>,
          icon: <TableOutlined />,
          key: `/${role}/admin`,
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
          label: <Link href={`/${role}/my-profile`}>profile-settings</Link>,
          icon: <SettingOutlined rotate={180} spin={true} />,
          key: `/${role}/my-profile`,
        },
        {
          label: <Link href={`/${role}/dashboard`}>dashboard</Link>,
          icon: <TableOutlined />,
          key: `/${role}/dashboard`,
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
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
