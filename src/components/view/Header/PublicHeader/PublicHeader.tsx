"use client";
import Navbar from "@/components/view/Navbar/Navbar";

const PublicHeader = () => {
  const items = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Services", href: "/available-services" },
    { key: "4", label: "About Us", href: "/about-us" },
    { key: "5", label: "Contact Us", href: "/contact-us" },
    { key: "5", label: "Dashboard", href: "/profile" },
  ];
  return (
    <>
      <Navbar items={items} />
    </>
  );
};

export default PublicHeader;
