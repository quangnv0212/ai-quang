"use client";
import { InputPassword } from "@/components/common/input-password";
import { InputTextCommon } from "@/components/common/input-text";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { z } from "zod";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

export default function RegisterPage() {
  const [check, setCheck] = useState(false);
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <div className="flex flex-col gap-3">
      <div className={"text-center text-34-34 font-bold"}>Register</div>
      <div
        className={
          "text-black-6 mt-5 mb-6 text-center font-medium text-16-16 font-visby"
        }
      >
        Join Us Today
      </div>
      <div>
        <form>
          <div className="">
            <div className="grid grid-cols-2 gap-5">
              <InputTextCommon
                label="First Name"
                name="firstName"
                placeholder="Vu"
              />
              <InputTextCommon
                label="Last Name"
                name="lastName"
                placeholder="Quang"
              />
              <InputTextCommon
                label="Company"
                name="company"
                placeholder="Nobisoft"
              />
              <InputTextCommon
                label="Phone number"
                name="phoneNumber"
                placeholder="094-236-1202"
              />
              <InputTextCommon
                label="Company"
                name="company"
                placeholder="Nobisoft"
              />
              <InputTextCommon
                label="Phone number"
                name="phoneNumber"
                placeholder="094-236-1202"
              />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <InputTextCommon
                label="Email address"
                name="email"
                placeholder="Enter your email"
              />
              <InputPassword
                label="Password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className={"mt-6 font-visby"}>
            <label className=" mb-2 flex items-center gap-2">
              <input
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span className="label-text">
                I agree with the terms and conditions.
              </span>
            </label>
            <div className="flex">
              <Link href="mail-success">
                <button className="btn mt-2 hover:bg-primary-hover rounded-3xl bg-primary text-white px-10">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </form>

        <div className={"flex justify-center py-4 font-visby "}>
          Already have an account?
          <Link href={"/login"} className="px-1 hover:text-blue-400">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
