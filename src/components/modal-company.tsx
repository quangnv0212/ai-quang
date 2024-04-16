import { useForm } from "react-hook-form";
import { ModalCommon } from "./common/modal-common";
import { Form } from "antd";
import { InputTextCommon } from "./common/input-text";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserBody, UserBodyType } from "@/schemaValidations/user.schema";
import { ToogleCommon } from "./common/toogle-common";
import { InputPassword } from "./common/input-password";

export interface IModalCompanyProps {
  modalState: {
    isOpen: boolean;
    detailInfo: undefined;
    type: string;
  };
  setModalState: (value: any) => void;
}

export function ModalCompany(props: IModalCompanyProps) {
  const { modalState, setModalState } = props;
  const handleCancel = () => {
    setModalState({ ...modalState, isOpen: false });
  };
  const { control, handleSubmit } = useForm<UserBodyType>({
    resolver: zodResolver(UserBody),
  });
  const onSubmit = (values: any) => {
    console.log(values);
  };
  const isConfirm = modalState.type === "delete";
  return (
    <ModalCommon
      open={modalState.isOpen}
      centered
      padding={0}
      footer={null}
      onCancel={handleCancel}
      style={{ borderRadius: 8 }}
      width={500}
      closable={false}
    >
      {isConfirm ? (
        <div className="flex flex-col gap-2">
          <p className="font-bold text-16-18 capitalize font-visby">
            Are you sure you want to delete this user?
          </p>
          <p>
            This action cannot be undone. This will permanently delete the user
          </p>
          <div className="flex justify-end gap-2">
            <button className="btn btn-sm">No</button>
            <button className="btn btn-sm bg-primary text-white hover:bg-primary">
              Yes
            </button>
          </div>
        </div>
      ) : (
        <div className="px-10 flex flex-col gap-4">
          <p className="font-bold text-24-28 capitalize text-center font-visby">
            Create a new user
          </p>
          <Form
            onFinish={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputTextCommon
              label="User name"
              name="userName"
              placeholder="Enter your userName"
              control={control}
            />
            <InputTextCommon
              label="Name"
              name="name"
              placeholder="Enter your name"
              control={control}
            />
            <InputTextCommon
              label="Surname"
              name="surname"
              placeholder="Enter your surname"
              control={control}
            />
            <InputTextCommon
              label="Email address"
              name="emailAddress"
              placeholder="Enter your email address"
              control={control}
            />
            <InputPassword
              control={control}
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <ToogleCommon label="Active" control={control} name="isActive" />
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="btn btn-sm w-full hover:bg-primary-hover bg-primary text-white border-none"
              >
                Create account
              </button>
              <button
                onClick={handleCancel}
                className="btn py-2 w-full btn-sm bg-slate-400 text-white border-none hover:bg-slate-500"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      )}
    </ModalCommon>
  );
}
