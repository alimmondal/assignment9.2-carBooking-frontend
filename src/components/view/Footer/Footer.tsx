/* eslint-disable react/no-unescaped-entities */
"use client";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Service Booking &copy; {new Date().getFullYear()} Created by Programming
      Hero's pupil
    </Footer>
  );
};

export default FooterComponent;
