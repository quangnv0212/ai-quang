"use client";
import authApiRequest from "@/apiRequests/auth";
import Logo from "@/assets/images/logo.png";
import { ButtonCommon } from "@/components/common/button-common";
import { InputPassword } from "@/components/common/input-password";
import { InputTextCommon } from "@/components/common/input-text";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const { control, handleSubmit } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: RegisterBodyType) => {
    try {
      if (loading) return;
      setLoading(true);
      await authApiRequest.register(values);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-3 justify-center items-center py-16 ">
      <div className="w-[600px] border-gray-400 rounded-2xl bg-white p-10">
        <div
          className={
            "text-primary text-center text-34-34 font-bold pb-2 flex flex-col gap-4"
          }
        >
          <div className="flex justify-center">
            <Image alt="" src={Logo} width={200} height={200} />
          </div>
          <p className={"text-center text-34-34 font-bold text-black"}>
            {" "}
            Register
          </p>
        </div>

        <div
          className={
            "text-black-6 mb-6 text-center font-medium text-16-16 font-visby"
          }
        >
          Join Us Today
        </div>
        <div className="w-full">
          <div className="flex justify-center items-center w-full">
            <Form
              onFinish={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <InputTextCommon
                label="Company Name"
                name="companyName"
                placeholder=""
                control={control}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputTextCommon
                  label="Country"
                  name="country"
                  placeholder=""
                  control={control}
                />
                <InputTextCommon
                  label="State"
                  name="state"
                  placeholder=""
                  control={control}
                />
                <InputTextCommon
                  label="Suburb"
                  name="suburb"
                  placeholder=""
                  control={control}
                />
                <InputTextCommon
                  label="Post Code"
                  name="postCode"
                  placeholder=""
                  control={control}
                />
              </div>
              <InputTextCommon
                label="First Address"
                name="firstAddress"
                placeholder=""
                control={control}
              />
              <InputTextCommon
                label="Second Address"
                name="secondAddress"
                placeholder=""
                control={control}
              />
              <InputTextCommon
                label="Username - Email"
                name="emailAddress"
                placeholder="Enter your email"
                control={control}
              />
              <div className="grid grid-cols-2 gap-4 w-full">
                <InputPassword
                  label="Password"
                  name="password"
                  placeholder="Choose a strong password"
                  control={control}
                />
                <InputPassword
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  control={control}
                />
              </div>
              <div className="flex flex-col gap-4"></div>
              <ButtonCommon
                type="submit"
                loading={loading}
                className="btn mt-2 hover:bg-primary-hover rounded-3xl bg-primary text-white px-10"
              >
                Register
              </ButtonCommon>
            </Form>
          </div>

          <div className={"flex justify-center py-4 font-visby "}>
            Already have an account?
            <Link href={"/login"} className="px-1 hover:text-blue-400">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
