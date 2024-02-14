"use client";

import ContactInput from "@/components/Forms/ContactInput";
import TextArea from "@/components/Forms/TextArea";
import Button from "@/components/ui/Button";
// import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import car from "../../../assets/fiat.png";

const ContactContent = () => {
  // const userInfo = getUserInfo() as any;
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      role: "",
      gender: "",
      contactNo: "",
      address: "",
      dateOfBirth: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  };

  //   if (userInfo) {
  //     return <p className="text-center">Logged In. Redirecting...</p>;
  //   }

  return (
    <div className="pt-2 md:pt-0">
      <div
        className="w-full md:h-[91.3vh] flex flex-col items-center justify-center relative "
        style={{
          backgroundImage: `url('${car.src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="md:w-1/2 text-center text-white py-8 md:pt-20 md:mb-[-130px] z-10">
          <h1 className=" text-4xl">Contact Us</h1>
          <p className="mt-2">
            Reach Out: Let us Collaborate on Simplifying Your Task Management
            Experience !
          </p>
        </div>

        <div className="w-full h-full flex flex-wrap items-center justify-around gap-8 z-10">
          <div className="flex flex-col gap-8 px-2 overflow-hidden">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-white text-black p-6 rounded-full">
                <FaLocationDot size={20} />
              </div>
              <div className="">
                <h1 className="text-sky-500 font-semibold">Address</h1>
                <p className="text-white">
                  House-13, Sector-13, <br /> Sonargaon Janapath, Uttara <br />{" "}
                  Dhaka-1230
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <div className="bg-white text-black p-6 rounded-full">
                <FaPhone size={20} />
              </div>
              <div className="">
                <h1 className="text-sky-500 font-semibold">Phone</h1>
                <p className="text-white">
                  +8801521210755 <br /> +8801536160661{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <div className="bg-white text-black p-6 rounded-full">
                <FaMailBulk size={20} />
              </div>
              <div className="">
                <h1 className="text-sky-500 font-semibold">Email</h1>
                <p className="text-white">taskhacks@proton.me</p>
              </div>
            </div>
          </div>

          <div
            className="w-full bg-white rounded-2xl p-8 md:w-1/3 overflow-hidden"
            style={{
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div>
              <h1 className="text-3xl py-4 text-primary ">Send Message</h1>
            </div>
            <form action="" className="text-slate-700">
              <ContactInput
                id="name"
                label="Full Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <ContactInput
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <TextArea
                id="description"
                label="Write your Message..."
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />

              <div className="mt-4 w-32">
                <Button
                  label="Send"
                  // onClick={handleSubmit(onSubmit)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;

// https://images.unsplash.com/photo-1642919794897-146bf10bff9e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
