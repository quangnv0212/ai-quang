"use client";
import { InputPassword } from "@/components/common/input-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputTextCommon } from "@/components/common/input-text";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
export default function Login() {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (value: LoginBodyType) => {
    console.log(value);
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div
        className={
          "flex flex-col justify-center items-center border p-10 border-gray-400 rounded-2xl bg-white"
        }
      >
        <div
          className={
            "text-black-1 text-center text-34-34 font-bold tracking-[-0.68px] pb-3 font-visby"
          }
        >
          Welcome back
        </div>
        <div
          className={
            "text-black-6 text-center font-medium text-16-16 pb-8 font-visby"
          }
        >
          Welcome back! Please enter your details
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"w-full flex flex-col gap-2"}>
            <InputTextCommon
              label="Email"
              name="email"
              placeholder="Enter your email"
              prefix={<UserOutlined />}
            />
            <InputPassword
              label="Password"
              name="password"
              placeholder="Enter your password"
              prefix={<KeyOutlined />}
            />
            <Link
              className="text-end text-14-16 font-semibold text-gray-500 hover:text-blue-400"
              href={""}
            >
              Forgot Password?
            </Link>
            <div className={" font-visby"}>
              <button
                type="submit"
                className="btn w-full hover:bg-primary-hover bg-primary text-white border-none"
              >
                Sign in
              </button>
            </div>
            <div className={"flex justify-center py-4 font-visby"}>
              Not registered?
              <Link
                href={"/register"}
                className="mx-1 hover:text-blue-300 link"
              >
                Create account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
