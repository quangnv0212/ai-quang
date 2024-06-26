import { useGetListTenant } from "@/apiRequests/hooks/tenant/useGetListTenant.hook";
import { useCreateUser } from "@/apiRequests/hooks/user/useCreateUser.hook";
import { useDeleteUser } from "@/apiRequests/hooks/user/useDeleteUser.hook";
import { useUpdateUser } from "@/apiRequests/hooks/user/useUpdateUser.hook";
import { SelectCommon } from "@/components/common/select-common";
import {
  AccountBody,
  AccountBodyType,
} from "@/schemaValidations/account.schema";
import { TenantBodyType } from "@/schemaValidations/tenant.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ButtonCommon } from "../../components/common/button-common";
import { InputTextCommon } from "../../components/common/input-text";
import { ModalCommon } from "../../components/common/modal-common";
import { ToogleCommon } from "../../components/common/toogle-common";

export interface IModalCompanyProps {
  modalState: {
    isOpen: boolean;
    detailInfo: any;
    type: string;
  };
  setModalState: (value: any) => void;
  fetchListUser: () => void;
  isSystemAdmin: boolean;
}

export function ModalUser(props: IModalCompanyProps) {
  const { modalState, setModalState, fetchListUser, isSystemAdmin } = props;
  const [requestCreateUser] = useCreateUser();
  const [requestUpdateUser] = useUpdateUser();
  const [requestDeleteUser] = useDeleteUser();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setModalState({ ...modalState, isOpen: false });
  };
  const [requestGetListTenant] = useGetListTenant();
  const [listTenant, setTenantList] = useState<TenantBodyType[]>([]);
  useEffect(() => {
    if (isSystemAdmin) return;
    requestGetListTenant(
      {
        MaxResultCount: 1000,
        SkipCount: 0,
      },
      () => {},
      (res: any) => {
        setTenantList(res?.result?.items);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }, []);
  console.log(modalState?.detailInfo);
  const isSystemAdminRole =
    modalState.detailInfo?.roleNames[0] === "SystemAdmin";
  const { control, handleSubmit } = useForm<AccountBodyType>({
    resolver: zodResolver(AccountBody),
    defaultValues: {
      emailAddress: modalState?.detailInfo?.emailAddress,
      userName: modalState?.detailInfo?.userName,
      isActive: modalState?.detailInfo?.isActive,
      password: modalState?.detailInfo?.password,
      roleNames:
        modalState?.detailInfo?.roleNames[0] === undefined
          ? "ViewerUser"
          : modalState?.detailInfo?.roleNames[0],
      company: modalState?.detailInfo?.company,
    },
  });
  const isConfirm = modalState.type === "delete";
  console.log(isSystemAdminRole);

  const onSubmit = (values: AccountBodyType) => {
    if (modalState.type === "create") {
      requestCreateUser(
        {
          ...values,
          roleNames: values.roleNames === "ViewerUser" ? [] : ["EditorUser"],
        },
        setLoading,
        () => {
          setModalState({ ...modalState, isOpen: false });
          toast.success("Create user successfully");
          fetchListUser();
        },
        () => {}
      );
    }
    if (modalState.type === "update") {
      requestUpdateUser(
        {
          id: modalState.detailInfo.id,
          userName: values.userName,
          emailAddress: values.emailAddress,
          isActive: values.isActive,
          password: values.password,
          company: values.company,
          roleNames: isSystemAdminRole
            ? ["Company"]
            : values.roleNames === "ViewerUser"
            ? []
            : [values.roleNames],
        },
        setLoading,
        () => {
          setModalState({ ...modalState, isOpen: false });
          toast.success("Update user successfully");
          fetchListUser();
        },
        () => {}
      );
    }
  };

  const handleDelete = () => {
    requestDeleteUser(
      {
        id: modalState.detailInfo.id,
      },
      setLoading,
      () => {
        setModalState({ ...modalState, isOpen: false });
        fetchListUser();
      },
      () => {}
    );
  };
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
            {modalState.type === "update" ? "Update User" : "Create a new user"}
          </p>
          <Form
            onFinish={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputTextCommon
              label="Email"
              name="emailAddress"
              placeholder="Enter your email"
              control={control}
            />
            <InputTextCommon
              label="Username"
              name="userName"
              placeholder="Enter username"
              control={control}
            />
            <InputTextCommon
              label="Password"
              name="password"
              placeholder="Enter password"
              control={control}
            />

            {!isSystemAdmin && (
              <SelectCommon
                name="company"
                label="Company"
                control={control}
                placeholder="Select company"
                disabled={Boolean(modalState.detailInfo)}
                options={listTenant.map((x) => {
                  return {
                    label: x.tenancyName,
                    value: x.id,
                  };
                })}
              />
            )}
            {!isSystemAdminRole && (
              <SelectCommon
                name="roleNames"
                label="Role"
                control={control}
                placeholder="Role"
                options={[
                  {
                    label: "Viewer",
                    value: "ViewerUser",
                  },
                  {
                    label: "Editor",
                    value: "EditorUser",
                  },
                ]}
              />
            )}

            <ToogleCommon label="Active" control={control} name="isActive" />
            <div className="flex flex-col gap-3 mt-3">
              <ButtonCommon
                loading={loading}
                type="submit"
                className="btn btn-sm w-full hover:bg-primary-hover bg-primary text-white border-none"
              >
                {modalState.type === "update" ? "Update User" : "Create user"}
              </ButtonCommon>
              <ButtonCommon
                onClick={handleCancel}
                className="btn py-2 w-full btn-sm bg-slate-400 text-white border-none hover:bg-slate-500"
              >
                Cancel
              </ButtonCommon>
            </div>
          </Form>
        </div>
      )}
    </ModalCommon>
  );
}
