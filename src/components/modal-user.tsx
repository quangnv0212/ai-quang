import {
  AccountBody,
  AccountBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonCommon } from "./common/button-common";
import { InputPassword } from "./common/input-password";
import { InputTextCommon } from "./common/input-text";
import { ModalCommon } from "./common/modal-common";
import { ToogleCommon } from "./common/toogle-common";

export interface IModalCompanyProps {
  modalState: {
    isOpen: boolean;
    detailInfo: any;
    type: string;
  };
  setModalState: (value: any) => void;
}

export function ModalUser(props: IModalCompanyProps) {
  const { modalState, setModalState } = props;
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setModalState({ ...modalState, isOpen: false });
  };
  const { control, handleSubmit } = useForm<AccountBodyType>({
    resolver: zodResolver(AccountBody),
    defaultValues: modalState.detailInfo || {
      isActive: false,
    },
  });
  const isConfirm = modalState.type === "delete";

  const onSubmit = (values: AccountBodyType) => {
    if (modalState.type === "create") {
    }
    if (modalState.type === "update") {
    }
  };

  const handleDelete = () => {};

  return (
    <ModalCommon
      open={modalState.isOpen}
      centered
      padding={0}
      footer={null}
      onCancel={handleCancel}
      style={{ borderRadius: 8 }}
      width={450}
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
            <ButtonCommon onClick={handleCancel} className="btn btn-sm">
              No
            </ButtonCommon>
            <ButtonCommon
              loading={loading}
              onClick={handleDelete}
              className="btn btn-sm bg-primary text-white hover:bg-primary"
            >
              Yes
            </ButtonCommon>
          </div>
        </div>
      ) : (
        <div className="px-6 flex flex-col gap-4">
          <p className="font-bold text-24-28 capitalize text-center font-visby">
            {modalState.type === "update" ? "Update user" : "Create a new user"}
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
            <div className="flex flex-col gap-3 mt-3">
              <ButtonCommon
                loading={loading}
                type="submit"
                className="btn btn-sm w-full hover:bg-primary-hover bg-primary text-white border-none"
              >
                {modalState.type === "update" ? "Update user" : "Create user"}
              </ButtonCommon>
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
