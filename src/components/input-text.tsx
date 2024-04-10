import { Input } from "antd";

export interface IInputTextCommonProps {
  label: string;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
}

export function InputTextCommon(props: IInputTextCommonProps) {
  const { label, name, placeholder, prefix } = props;
  return (
    <div className={"flex flex-col gap-2"}>
      <p className="font-medium">{label}</p>
      <Input
        name={name}
        className="font-visby w-full"
        size="large"
        placeholder={placeholder}
        prefix={prefix}
      />
    </div>
  );
}
