"use client";
// import { authKey } from "@/constants/storageKey";
import { useAppDispatch } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Typography } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;
const { Title } = Typography;

const Navbar = ({
  items,
  hasSider,
}: {
  items: { key: string; label: string; href: string }[];
  hasSider?: boolean;
}) => {
  const { role } = getUserInfo() as any;
  // const role = USER_ROLE.ADMIN;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const logOut = () => {
  //   removeUserInfo(authKey);
  //   router.push("/login");
  // };

  return (
    <Layout className="layout">
      <Header className="flex items-center">
        {/* {hasSider && (
          <Button
            type="primary"
            className="lg:hidden"
            onClick={() => {
              dispatch(showSidebarDrawer());
            }}
          >
            <MenuOutlined />
          </Button>
        )} */}
        <Content>
          <Link href="/">
            <Title
              className={`m-0 text-white text-3xl ${
                hasSider && "text-center lg:text-left"
              }`}
            >
              Car booking
            </Title>
          </Link>
        </Content>
        <Menu
          className="lg:block hidden"
          disabledOverflow
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
        >
          {items?.map((item) => (
            <Menu.Item key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}

          {/* {!role && (
            <p onClick={() => router.push("/login")}>Sign In register</p>
          )} */}
        </Menu>

        <Button type="primary" className="lg:hidden" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="Menu" placement="right" onClose={onClose} open={open}>
          <Menu
            theme="light"
            mode="vertical"
            selectedKeys={[pathname]}
            style={{ borderRight: 0 }}
          >
            {items?.map((item) => (
              <Menu.Item key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;
