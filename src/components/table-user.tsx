import userApiRequest from "@/apiRequests/user";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Tag } from "antd";
import type { TablePaginationConfig } from "antd/es/table/interface";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDebouncedCallback } from "use-debounce";
import { TableCommon } from "./common/table-common";
import { ModalUser } from "./modal-user";

interface DataType {
  key: string;
  userName: string;
  fullName: string;
  email: string;
  isActive: boolean;
  action?: any;
}

const TableUser: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  //get all query params
  let querySearch: any;
  searchParams.forEach((value, key) => {
    querySearch = {
      ...querySearch,
      [key]: value,
    };
  });
  const [modalState, setModalState] = useState<any>({
    isOpen: false,
    type: "create",
  });

  const [total, setTotal] = useState(0);
  const { data: dataUser, isLoading } = useQuery({
    queryKey: ["getListUser", querySearch],
    queryFn: () =>
      userApiRequest.getListUser(querySearch).then((res) => {
        setTotal(res.data.result.totalCount);
        return res?.data?.result?.items;
      }),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "email",
    },
    {
      title: "Created At",
      dataIndex: "creationTime",
      key: "creationTime",
      render: (creationTime) => (
        <span>{new Date(creationTime).toLocaleString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (status) =>
        status ? (
          <Tag
            icon={<CheckCircleOutlined />}
            color="success"
            style={{
              fontFamily: "Visby",
              fontWeight: 500,
              borderRadius: 20,
            }}
          >
            Active
          </Tag>
        ) : (
          <Tag
            style={{
              fontFamily: "Visby",
              fontWeight: 500,
              borderRadius: 20,
            }}
            icon={<CloseCircleOutlined />}
            color="error"
          >
            Deactive
          </Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record, index) => {
        return (
          <div className="flex gap-3">
            <EditOutlined
              onClick={() =>
                setModalState({
                  ...modalState,
                  isOpen: true,
                  type: "update",
                  detailInfo: record,
                })
              }
              style={{ fontSize: 16 }}
              className="hover:text-primary cursor-pointer"
            />
            <DeleteOutlined
              onClick={() =>
                setModalState({
                  ...modalState,
                  isOpen: true,
                  type: "delete",
                  detailInfo: record,
                })
              }
              className="hover:text-primary cursor-pointer"
              style={{ fontSize: 16 }}
            />
          </div>
        );
      },
    },
  ];
  const buttons = [
    {
      title: "All",
      isActveString: undefined,
    },
    {
      title: "Active",
      isActveString: "true",
    },
    {
      title: "Deactive",
      isActveString: "false",
    },
  ];

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("Keyword", term);
    } else {
      params.delete("Keyword");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  let skipCount = Number(searchParams.get("skipCount")) || 1;
  let maxResultCount = Number(searchParams.get("maxResultCount")) || 10;
  let current = Math.ceil(skipCount / maxResultCount);
  if (skipCount % maxResultCount === 0) {
    current += 1;
  }
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const params = new URLSearchParams(searchParams);
    params.set(
      "skipCount",
      `${((pagination.current || 1) - 1) * maxResultCount}`
    );
    params.set("maxResultCount", maxResultCount.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {modalState.isOpen && (
        <ModalUser modalState={modalState} setModalState={setModalState} />
      )}
      <div className="flex flex-col gap-5">
        <p className="text-34-34 font-semibold">Manage Company</p>
        <div className="">
          <div className="flex justify-end gap-2">
            {buttons.map((button, index) => {
              let query: any = {};
              if (button.title === "Active") {
                query.isActive = true;
              } else if (button.title === "Deactive") {
                query.isActive = false;
              }
              let className: string = "";
              const isActiveSearchParam = searchParams.get("isActive");
              if (isActiveSearchParam === null && button.title === "All") {
                className = "btn-primary btn-active";
              }
              if (isActiveSearchParam === button.isActveString) {
                className = "btn-primary btn-active";
              }
              return (
                <Link
                  href={{
                    pathname: "/",
                    query,
                  }}
                  key={index}
                  className={`btn btn-sm ${className}`}
                >
                  {button.title}
                </Link>
              );
            })}
          </div>
          <div className="">
            <input
              className="grow"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get("Keyword")?.toString()}
            />
          </div>
        </div>
        <TableCommon
          className="font-visby"
          pagination={{
            pageSize: Number(searchParams.get("maxResultCount")) || 10,
            current,
            total,
            showQuickJumper: true,
          }}
          loading={isLoading}
          onChange={handleTableChange}
          columns={columns as any}
          dataSource={dataUser}
          footer={() => (
            <div className="justify-center my-2 ">
              <button
                onClick={() =>
                  setModalState({
                    ...modalState,
                    isOpen: true,
                    type: "create",
                    detailInfo: undefined,
                  })
                }
                className="btn w-full bg-primary border-none hover:bg-primary-hover"
              >
                <PlusOutlined style={{ fontSize: "18px", color: "white" }} />
                <span className="font-bold uppercase text-white ">
                  Create a new user
                </span>
              </button>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default TableUser;
