"use client";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { TableCommon } from "./common/table-common";
import { IconSearch } from "./icons";
import { ModalUser } from "./modal-user";
import { useQuery } from "@tanstack/react-query";
let timeout: any;
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

  //state
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState<string | undefined>(
    searchParams.get("Keyword")?.toString()
  );

  //react query
  const { data: dataUser, isLoading } = useQuery({
    queryKey: ["getListUser", querySearch],
    queryFn: () =>
      userApiRequest.getListUser(querySearch).then((res) => {
        setTotal(res.data.result.totalCount);
        return res?.data?.result?.items;
      }),
  });

  //table
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
      onclick: () => {
        const params = new URLSearchParams(searchParams);
        params.delete("isActive");
        params.delete("Keyword");
        params.delete("skipCount");
        setKeyword("");
        replace(`${pathname}?${params.toString()}`);
      },
    },
    {
      title: "Active",
      isActveString: "true",
      onclick: () => {
        const params = new URLSearchParams(searchParams);
        params.set("isActive", "true");
        params.delete("Keyword");
        params.delete("skipCount");
        setKeyword("");

        replace(`${pathname}?${params.toString()}`);
      },
    },
    {
      title: "Deactive",
      isActveString: "false",
      onclick: () => {
        const params = new URLSearchParams(searchParams);
        params.set("isActive", "false");
        params.delete("Keyword");
        params.delete("skipCount");
        setKeyword("");

        replace(`${pathname}?${params.toString()}`);
      },
    },
  ];

  const handleSearch = (term: string) => {
    setKeyword(term);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("Keyword", term);
        params.set("skipCount", "0");
      } else {
        params.delete("Keyword");
        params.set("skipCount", "0");
      }
      replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const params = new URLSearchParams(searchParams);
    params.set(
      "skipCount",
      `${((pagination.current || 1) - 1) * maxResultCount}`
    );
    params.set("maxResultCount", maxResultCount.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  let skipCount = Number(searchParams.get("skipCount")) || 1;
  let maxResultCount = Number(searchParams.get("maxResultCount")) || 10;
  let current = Math.ceil(skipCount / maxResultCount);
  if (skipCount % maxResultCount === 0) {
    current += 1;
  }

  return (
    <>
      {modalState.isOpen && (
        <ModalUser modalState={modalState} setModalState={setModalState} />
      )}
      <div className="flex flex-col gap-5">
        <p className="text-34-34 font-semibold">Manage User</p>
        <div className="">
          <div className="flex justify-between gap-2">
            <div className="px-5 rounded-lg flex items-center gap-2 h-[38px] w-[400px] bg-white border">
              <IconSearch />
              <input
                type="text"
                placeholder="Search"
                className="w-full font-normal  outline-none text-primary placeholder:text-gray80"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                value={keyword}
              />
            </div>
            <div className="flex gap-2">
              {buttons.map((button, index) => {
                let className: string = "";
                const isActiveSearchParam = searchParams.get("isActive");
                if (isActiveSearchParam === null && button.title === "All") {
                  className = "btn-primary btn-active";
                }
                if (isActiveSearchParam === button.isActveString) {
                  className = "btn-primary btn-active";
                }
                return (
                  <button
                    key={index}
                    className={`btn btn-sm ${className}`}
                    onClick={button.onclick}
                  >
                    {button.title}
                  </button>
                );
              })}
            </div>
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
