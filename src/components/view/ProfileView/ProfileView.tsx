"use client";

import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const ProfileView = () => {
  const data = getUserInfo() as any;
  //   console.log(role);
  return (
    <>
      {data.role ? (
        <Link className="" href="/profile">
          Profile
        </Link>
      ) : (
        <a href="/login">sign in</a>
      )}
    </>
  );
};

export default ProfileView;
