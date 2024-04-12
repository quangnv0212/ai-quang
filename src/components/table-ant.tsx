import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";
import { Button, Input, Space, Table, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import styled from "styled-components";

interface DataType {
  key: string;
  userName: string;
  fullName: string;
  email: string;
  isActive: boolean;
  action?: any;
}

type DataIndex = keyof DataType;
export const TableCommon = styled(Table)`
  & .ant-table .ant-table-selection-column {
    width: 60px;
    max-width: 80px;
  }
  & .ant-table {
    background-color: #f5f5f5;
    border-top: 1px solid white;
    border-radius: 20px;
    font-family: "Visby";
  }
  & .ant-table .ant-table-container .ant-table-content table .ant-table-row {
    background-color: white;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell {
    font-weight: bold;
  }
  & .ant-table .ant-table-container {
    border-radius: 20px;
  }

  & .ant-table .ant-table-container .ant-table-content {
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell {
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    tbody.ant-table-tbody
    tr:last-child
    td {
    border-radius: 0px;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    .ant-table-row.ant-table-row-level-0:last-child
    td:first-child {
    border-bottom-left-radius: 20px;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    .ant-table-row.ant-table-row-level-0:last-child
    td:last-child {
    border-bottom-right-radius: 20px;
  }

  &
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    content: none;
  }
  & .ant-table-footer {
    padding: 0;
    background-color: #f5f5f5;
    padding-top: 8px;
  }
  & .ant-table-pagination-right {
    display: flex;
    justify-content: center;
  }
  & .ant-space.ant-space-vertical {
    width: 100%;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell {
    background-color: white;
    border-radius: 0px;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell:first-child {
    border-top-left-radius: 20px;
  }
  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell:last-child {
    border-top-right-radius: 20px;
  }
  & .ant-table-pagination.ant-pagination {
    margin-top: 8px;
  }
  & .ant-space .ant-space-vertical {
    width: 100% !important;
  }
  .ant-table-container {
    overflow: auto;
  }
`;
const data: DataType[] = [
  {
    key: "1",
    userName: "John Brown",
    fullName: "John Brown",
    isActive: true,
    email: "quangnv.0212@gmail.com",
  },
  {
    key: "2",
    userName: "John Brown",
    fullName: "John Brown",
    isActive: false,
    email: "quangnv.0212@gmail.com",
  },
  {
    key: "3",
    userName: "Alice Smith",
    fullName: "Alice Smith",
    isActive: true,
    email: "alice.smith@example.com",
  },
  {
    key: "4",
    userName: "Bob Johnson",
    fullName: "Bob Johnson",
    isActive: true,
    email: "bob.johnson@example.com",
  },
  {
    key: "5",
    userName: "Emily Davis",
    fullName: "Emily Davis",
    isActive: false,
    email: "emily.davis@example.com",
  },
  {
    key: "6",
    userName: "Michael Wilson",
    fullName: "Michael Wilson",
    isActive: true,
    email: "michael.wilson@example.com",
  },
  {
    key: "7",
    userName: "Jessica Lee",
    fullName: "Jessica Lee",
    isActive: false,
    email: "jessica.lee@example.com",
  },
  {
    key: "8",
    userName: "David Martinez",
    fullName: "David Martinez",
    isActive: true,
    email: "david.martinez@example.com",
  },
  {
    key: "9",
    userName: "Sophia Garcia",
    fullName: "Sophia Garcia",
    isActive: true,
    email: "sophia.garcia@example.com",
  },
  {
    key: "10",
    userName: "Matthew Lopez",
    fullName: "Matthew Lopez",
    isActive: false,
    email: "matthew.lopez@example.com",
  },
  {
    key: "11",
    userName: "Olivia Wilson",
    fullName: "Olivia Wilson",
    isActive: true,
    email: "olivia.wilson@example.com",
  },
];

const TableAnt: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
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
              fontWeight: 600,
            }}
          >
            Active
          </Tag>
        ) : (
          <Tag
            style={{
              fontFamily: "Visby",
              fontWeight: 600,
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
      render: () => {
        return (
          <div className="flex gap-3">
            <EditOutlined
              style={{ fontSize: 16 }}
              className="hover:text-primary cursor-pointer"
            />
            <DeleteOutlined
              className="hover:text-primary cursor-pointer"
              style={{ fontSize: 16 }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <TableCommon
      className="font-visby"
      pagination={{
        pageSize: 10,
        current: 1,
        total: 100,
        showQuickJumper: true,
      }}
      columns={columns as any}
      dataSource={data}
    />
  );
};

export default TableAnt;
