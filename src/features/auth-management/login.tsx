"use client";
import authApiRequest from "@/apiRequests/auth";
import Logo from "@/assets/images/logo.png";
import { ButtonCommon } from "@/components/common/button-common";
import { InputCheckCommon } from "@/components/common/input-check";
import { InputPassword } from "@/components/common/input-password";
import { InputTextCommon } from "@/components/common/input-text";
import { clientSessionToken } from "@/lib/http";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Tabs, TabsProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const { control, handleSubmit, getValues } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
  });

  // get domain
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    const tenancyName = getValues("tenancyName");
    try {
      if (tenancyName) {
        const resCheck = await authApiRequest.isTenantAvailable({
          tenancyName: tenancyName,
        });
        const tenantId = resCheck.data.result.tenantId ?? null;
        if (!tenantId) {
          toast.error("Not found company");
          return;
        }
      }
      const res = await authApiRequest.login(values, tenancyName);
      const {
        accessToken = "",
        encryptedAccessToken = "",
        expireInSeconds = "",
      } = res.data.result;
      clientSessionToken.value = accessToken;
      await authApiRequest.auth({
        accessToken,
        encryptedAccessToken,
        expireInSeconds,
      });
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.error.details || "Error");
    } finally {
      setLoading(false);
    }
  }
  const onChange = (key: string) => {
    console.log(key);
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
            "text-black-1 text-center text-34-34 font-bold pb-3 flex flex-col gap-2"
          }
        >
          <Image alt="" src={Logo} width={200} height={200} />
        </div>
        <div
          className={
            "text-black-6 text-center font-medium text-16-16 pb-2 font-visby"
          }
        >
          Welcome back! Please enter your details
        </div>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Global Admin",
              children: (
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
                      href={"/forgot-password"}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <ButtonCommon
                    loading={loading}
                    type="submit"
                    className="btn w-full hover:bg-primary-hover bg-primary text-white border-none"
                  >
                    Sign in
                  </ButtonCommon>
                </Form>
              ),
            },
            {
              key: "2",
              label: "System Admin",
              children: (
                <Form
                  onFinish={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 w-[300px]"
                >
                  <InputTextCommon
                    label="Company Name"
                    name="tenancyName"
                    placeholder="Enter your company name"
                    prefix={<UserOutlined />}
                    control={control}
                  />
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
                      href={"/forgot-password"}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <ButtonCommon
                    loading={loading}
                    type="submit"
                    className="btn w-full hover:bg-primary-hover bg-primary text-white border-none"
                  >
                    Sign in
                  </ButtonCommon>
                </Form>
              ),
            },
          ]}
          onChange={onChange}
        />
        ;
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
