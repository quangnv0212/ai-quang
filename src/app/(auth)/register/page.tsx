"use client";
import { InputTextCommon } from "@/components/common/input-text";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { InputPassword } from "@/components/common/input-password";
import authApiRequest from "@/apiRequests/auth";

export default function RegisterPage() {
  const { control, handleSubmit } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
  });
  const onSubmit = async (values: RegisterBodyType) => {
    const x = await authApiRequest.register(values);
  };
  return (
    <div className="flex flex-col gap-3 justify-center items-center py-16 ">
      <div className="w-[600px] border-gray-400 rounded-2xl bg-white p-10">
        <div className={"text-primary text-center text-34-34 font-bold pb-2"}>
          <span>AiBase</span>
          <span className={"text-center text-34-34 font-bold text-black"}>
            {" "}
            Register
          </span>
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
              <div className="grid grid-cols-2 gap-4 w-full">
                <InputTextCommon
                  label="First Name"
                  name="firstName"
                  placeholder=""
                  control={control}
                />
                <InputTextCommon
                  label="Last Name"
                  name="lastName"
                  placeholder="Quang"
                  control={control}
                />
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
                <InputTextCommon
                  label="Email Address"
                  name="emailAddress"
                  placeholder="Enter your email"
                  control={control}
                />
                <InputTextCommon
                  label="Company Name"
                  name="companyName"
                  placeholder=""
                  control={control}
                />
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
                  label="Post Code"
                  name="postCode"
                  placeholder=""
                  control={control}
                />
                <InputTextCommon
                  label="Suburb"
                  name="suburb"
                  placeholder=""
                  control={control}
                />
              </div>
              <div className="flex flex-col gap-4">
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
                  label="Captcha Response"
                  name="captchaResponse"
                  placeholder=""
                  control={control}
                />
              </div>
              <button
                type="submit"
                className="btn mt-2 hover:bg-primary-hover rounded-3xl bg-primary text-white px-10"
              >
                Register
              </button>
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
