"use client";

import authApiRequest from "@/apiRequests/auth";
import { ButtonCommon } from "@/components/common/button-common";
import { InputPassword } from "@/components/common/input-password";
import { InputTextCommon } from "@/components/common/input-text";
import {
  ChangePasswordBody,
  ChangePasswordBodyType,
} from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const { control, handleSubmit } = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: any) {
    if (loading) return;
    setLoading(true);
    try {
      const tenantIdRes = await authApiRequest.changePasswordUser({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      if (tenantIdRes.status === 200) {
        toast.success("Password changed successfully");
        await authApiRequest.logoutFromNextClientToNextServer();
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      console.log(values);

      toast.error(error.response.data.error.details || "Error");
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
        <Form
          onFinish={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-[300px]"
        >
          <InputPassword
            label="Current Password"
            name="currentPassword"
            placeholder="Enter your current password"
            // prefix={<KeyOutlined />}
            control={control}
          />
          <InputPassword
            label="New Password"
            name="newPassword"
            placeholder="Enter your new password"
            // prefix={<KeyOutlined />}
            control={control}
          />
          <InputPassword
            label="Confirm new password"
            name="confirmNewPassword"
            placeholder="Confirm your New Password"
            // prefix={<KeyOutlined />}
            control={control}
          />

          <ButtonCommon
            loading={loading}
            type="submit"
            className="btn w-full hover:bg-primary-hover bg-primary text-white border-none"
          >
            Change password
          </ButtonCommon>
        </Form>
      </div>
    </div>
  );
}
