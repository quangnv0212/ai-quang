"use client";
import { ButtonCommon } from "@/components/common/button-common";
import { InputTextCommon } from "@/components/common/input-text";
import { UserOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Link from "next/link";
import { useForm } from "react-hook-form";
export default function ForgetPasswordPage() {
  const { control, handleSubmit } = useForm({});
  const onSubmit = (values: any) => {
    console.log(values);
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
          <p className="text-primary">AiBase </p>
          <p>Forgot password?</p>
        </div>
        <div
          className={
            "text-black-6 text-center font-medium text-14-16 pb-2 font-visby"
          }
        >
          Remember your password?{" "}
          <Link href={"/login"} className="mx-1 hover:text-blue-300 link">
            Login here
          </Link>
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

          <div className="flex justify-end mb-2">
            <Link
              className="text-14-16 font-semibold text-gray-500 hover:text-blue-400"
              href={"/forgot-password"}
            >
              Forgot Password?
            </Link>
          </div>

          <ButtonCommon
            // loading={loading}
            type="submit"
            className="btn w-full hover:bg-primary-hover bg-primary text-white border-none"
          >
            Send email
          </ButtonCommon>
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
