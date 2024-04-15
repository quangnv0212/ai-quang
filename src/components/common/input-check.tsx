import { Input } from "antd";
import * as React from "react";
import { FormItem } from "react-hook-form-antd";

export interface IInputCheckCommonProps {
  label: string;
  name: string;
  control?: any;
}

export function InputCheckCommon(props: IInputCheckCommonProps) {
  const { label, name, control } = props;
  return (
    <div className={"flex gap-2"}>
      <FormItem control={control} name={name} label={label}>
        <Input
          style={{
            fontFamily: "Visby",
          }}
          name={name}
          size="large"
          type="checkbox"
        />
      </FormItem>
    </div>
  );
}
