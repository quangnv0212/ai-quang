"use client";
import { InputPassword } from "@/components/common/input-password";
import { InputTextCommon } from "@/components/common/input-text";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import Link from "next/link";
import { useForm } from "react-hook-form";
export default function SignUpPage() {
  const { control, handleSubmit } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
  });

  return (
    <div className="flex justify-center items-center sm:my-8 my-5">
      <div
        className={
          "flex flex-col justify-center items-center border p-10 border-gray-400 rounded-2xl bg-white"
        }
      >
        <div
          className={
            "text-primary text-center text-34-34 font-bold tracking-[-0.68px] pb-2 font-visby"
          }
        >
          AiBase
        </div>
        <div
          className={
            "text-black-6 text-center font-medium text-16-16 pb-8 font-visby capitalize"
          }
        >
          Join us today
        </div>
        <div className={"w-full flex flex-col gap-2"}>
          <Form
            onFinish={handleSubmit((data) => {
              console.log(data);
            })}
            className="flex flex-col gap-4 w-[300px]"
          >
            {/* <InputTextCommon
              label="First name"
              name="firstName"
              placeholder="Enter your first name"
              control={control}
            />

            <InputTextCommon
              label="Last name"
              name="lastName"
              placeholder="Enter your last name"
              control={control}
            />
            <InputTextCommon
              label="Company name"
              name="firstName"
              placeholder="Enter your first name"
              control={control}
            />
            <InputTextCommon
              label="Country"
              name="lastName"
              placeholder="Enter your last name"
              control={control}
            />
            <InputTextCommon
              label="Address 1"
              name="lastName"
              placeholder="Enter your last name"
              control={control}
            />
            <InputTextCommon
              label="Address 2"
              name="lastName"
              placeholder="Enter your last name"
              control={control}
            /> */}
            <InputTextCommon
              label="Email"
              name="email"
              placeholder="Enter your email"
              control={control}
            />
            <InputPassword
              label="Password"
              name="password"
              placeholder="Enter your password"
              control={control}
            />
            <InputPassword
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              control={control}
            />
          </Form>
          <Link
            className="text-end text-14-16 font-semibold text-gray-500 hover:text-blue-400"
            href={""}
          >
            Forgot Password?
          </Link>
          <div className={" font-visby"}>
            <button className="btn w-full hover:bg-primary-hover bg-primary text-white border-none">
              Sign in
            </button>
          </div>
          <div className={"flex justify-center py-4 font-visby"}>
            Not registered?
            <Link href={"/register"} className="mx-1 hover:text-blue-300 link">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
