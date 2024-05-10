"use client";
import { Select } from "antd";
import { FormItem } from "react-hook-form-antd";

export interface IInputTextCommonProps {
  label: string;
  name: string;
  placeholder?: string;
  control?: any;
  size?: "large" | "middle" | "small";
  options?: any;
}

export function SelectCommon(props: IInputTextCommonProps) {
  const { label, name, placeholder, control, size = "middle", options } = props;
  return (
    <div className={"flex flex-col gap-2"}>
      <p className="font-medium">{label}</p>
      <FormItem control={control} name={name}>
        <Select
          style={{
            fontFamily: "Visby",
          }}
          placeholder={placeholder}
          size={size}
          options={options}
        />
      </FormItem>
    </div>
  );
}
