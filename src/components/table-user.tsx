import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";
import { Button, Input, Space, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { TableCommon } from "./common/table-common";
import { ModalCommon } from "./common/modal-common";
import { ModalUser } from "./modal-user";
import { useQuery } from "react-query";
import userApiRequest from "@/apiRequests/user";

interface DataType {
  key: string;
  userName: string;
  fullName: string;
  email: string;
  isActive: boolean;
  action?: any;
}

type DataIndex = keyof DataType;

const TableUser: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [modalState, setModalState] = useState<any>({
    isOpen: false,
    type: "create",
  });
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const [total, setTotal] = useState(0);
  const { data: dataUser, isLoading } = useQuery({
    queryKey: ["getListUser"],
    queryFn: () =>
      userApiRequest
        .getListUser({
          isActive: true,
          SkipCount: 0,
          MaxResultCount: 10,
        })
        .then((res) => {
          setTotal(res.data.result.totalCount);
          return res?.data?.result?.items;
        }),
  });
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      sorter: true,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "email",
      ...getColumnSearchProps("email"),
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

  return (
    <>
      {modalState.isOpen && (
        <ModalUser modalState={modalState} setModalState={setModalState} />
      )}
      <div className="flex flex-col gap-5">
        <p className="text-34-34 font-semibold">Manage Company</p>
        <TableCommon
          className="font-visby"
          pagination={{
            pageSize: 5,
            current: 1,
            total: 100,
            showQuickJumper: true,
          }}
          loading={isLoading}
          columns={columns as any}
          dataSource={dataUser}
          footer={() => (
            <div className="justify-center my-2 ">
              <button
                onClick={() =>
                  setModalState({ ...modalState, isOpen: true, type: "create" })
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
