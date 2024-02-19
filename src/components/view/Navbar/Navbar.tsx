"use client";
import { useAppDispatch } from "@/redux/hooks";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../../assets/car3.png";

const { Header: AntHeader, Content } = Layout;
const { Title } = Typography;

const Navbar = ({
  items,
  hasSider,
}: {
  items: { key: string; label: string; href: string }[];
  hasSider?: boolean;
}) => {
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

  // const { role } = getUserInfo() as any;

  return (
    <Layout
      style={{
        overflow: "auto",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: "999",
      }}
      className=""
    >
      <AntHeader className="flex items-center justify-center overflow-hidden">
        <Content>
          <Link
            href="/"
            className={`P-2 text-white  flex items-center justify-start ${
              hasSider && "text-center lg:text-left"
            }`}
          >
            {/* <Title
              className={`P-2 flex items-center justify-start ${
                hasSider && "text-center lg:text-left"
              }`}
              style={{ color: "#fff", fontSize: "20px" }}
            > */}
            {/* Car booking */}
            <Image src={logo} alt="" width={100} height={50} />
            <h1 className="">GOOD DRIVE</h1>
            {/* </Title> */}
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
        </Menu>

        <Button
          type="primary"
          className="flex self-center lg:hidden"
          onClick={showDrawer}
        >
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
      </AntHeader>
    </Layout>
  );
};

export default Navbar;
