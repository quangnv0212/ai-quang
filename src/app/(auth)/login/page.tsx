"use client";
import authApiRequest from "@/apiRequests/auth";
import { useAppContext } from "@/app-provider";
import { InputCheckCommon } from "@/components/common/input-check";
import { InputPassword } from "@/components/common/input-password";
import { InputTextCommon } from "@/components/common/input-text";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { control, handleSubmit } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await authApiRequest.login(values);
      const accessToken = res.data.result.accessToken || "";
      const encryptedAccessToken = res.data.result.encryptedAccessToken || "";
      const expireInSeconds = res.data.result.expireInSeconds || "";
      const userId = res.data.result.userId || "";
      await authApiRequest.auth({
        accessToken,
        encryptedAccessToken,
        expireInSeconds,
      });
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen ">
      <div
        className={
          "flex flex-col justify-center items-center border p-10 border-gray-400 rounded-2xl bg-white"
        }
      >
        <div
          className={
            "text-black-1 text-center text-34-34 font-bold pb-3 flex flex-col gap-2"
          }
        >
          <p className="text-primary">AiBase </p>
          <p>Welcome back</p>
        </div>
        <div
          className={
            "text-black-6 text-center font-medium text-16-16 pb-8 font-visby"
          }
        >
          Welcome back! Please enter your details
        </div>
        <Form
          onFinish={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-[300px]"
        >
          <InputTextCommon
            label="Email"
            name="userNameOrEmailAddress"
            placeholder="Enter your email"
            prefix={<UserOutlined />}
            control={control}
          />
          <InputPassword
            label="Password"
            name="password"
            placeholder="Enter your password"
            prefix={<KeyOutlined />}
            control={control}
          />
          <InputCheckCommon
            label="Remember me"
            name="rememberClient"
            control={control}
          />
          <div className="flex justify-end mb-2">
            <Link
              className="text-14-16 font-semibold text-gray-500 hover:text-blue-400"
              href={""}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn w-full hover:bg-primary-hover bg-primary text-white border-none"
          >
            Sign in
          </button>
        </Form>
        <div className={"flex justify-center py-4 font-visby"}>
          Not registered?
          <Link href={"/register"} className="mx-1 hover:text-blue-300 link">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
