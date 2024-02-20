"use client";
import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  // const role = USER_ROLE.ADMIN;
  const { role } = getUserInfo() as any;
  // console.log(role);
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row justify="end" align="middle" className="flex gap-3">
        <Link href={"/"} className="text-1xl">
          <HomeOutlined className="text-sky-700 text-xl hover:opacity-70" />
        </Link>
        {/* <h1
          style={{
            margin: "0px 5px",
          }}
        >
          {role}
        </h1> */}

        <Dropdown menu={{ items }}>
          <a>
            <Space>
              <Avatar
                size="large"
                icon={
                  <UserOutlined className="text-sky-700 text-xl hover:opacity-70 ml-5" />
                }
              />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
