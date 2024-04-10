"use client";
import { InputPassword } from "@/components/input-password";
import { InputTextCommon } from "@/components/input-text";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
export default function Login() {
  return (
    <div className="flex w-full h-[100vh] font-visby ">
      <div
        className={
          "flex-1 flex flex-col justify-between pt-28 pb-8 items-center bg-gray-F5F5F5"
        }
      >
        <div
          className={
            "flex flex-col justify-center items-center px-2 md:px-[0px] md:min-w-[360px]"
          }
        >
          <div className={"pb-8"}>
            {/* <img src={logoSvg} alt={"logo"} /> */}
          </div>
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
            <div className={"mt-6 font-visby"}>
              <button className="btn w-full hover:bg-black rounded-3xl bg-primary text-white">
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
        </div>
      </div>
    </div>
  );
}
