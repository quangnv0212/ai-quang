"use client";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
export interface IInputPasswordProps {
  label: string;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
}

export function InputPassword(props: IInputPasswordProps) {
  const { label, name, placeholder, prefix } = props;
  return (
    <div className={"flex flex-col gap-2"}>
      <p className="font-medium">{label}</p>
      <Input.Password
        placeholder={placeholder}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        size="large"
        prefix={prefix}
      />
    </div>
  );
}
