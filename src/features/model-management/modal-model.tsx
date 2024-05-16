"use client";
import { useGetListModel } from "@/apiRequests/hooks/model/useGetListModel";
import { ButtonCommon } from "@/components/common/button-common";
import { ModalCommon } from "@/components/common/modal-common";
import { TableCommon } from "@/components/common/table-common";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import type { GetProp, TableColumnsType, UploadFile, UploadProps } from "antd";
import { Button, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadImage } from "./UploadImage";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function ModalModel() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [modelList, setModelList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [requestGetListModel] = useGetListModel();
  const fetchListTenant = () => {
    requestGetListModel(
      setLoading,
      (res: any) => {
        setModelList(res.result);
      },
      (err: any) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    fetchListTenant();
  }, []);

  const onDownload = async (record: any) => {};

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image Count",
      dataIndex: "imageCount",
      key: "imageCount",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render(value, record, index) {
        return (
          <div className="flex gap-3">
            <ButtonCommon onClick={() => onDownload(record)}>
              <DownloadOutlined />
            </ButtonCommon>
            <ButtonCommon
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <EyeOutlined />
            </ButtonCommon>
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(selectedRowKeys);
    },
  };

  const handleUpload = () => {};

  const props: UploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const getList = async (
    modelId: number,
    pageIndex: number,
    pageSize: number
  ) => {};

  const handleTraning = () => {
    // call api training
  };

  const checkStatusTraningModel = () => {
    // call api check status tranning model
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleCancel = () => {
    setModalOpen(false);
  };
  console.log(fileList);

  return (
    <>
      <ModalCommon
        open={modalOpen}
        centered
        padding={0}
        footer={null}
        onCancel={handleCancel}
        style={{ borderRadius: 8 }}
        width={600}
        closable={false}
      >
        <>
          <div className="flex justify-between flex-col">
            <div className="flex-1">
              <p className="pb-5 text-2xl font-semibold">Quick test</p>
              {/* <div className="bg-gray-300 flex items-center justify-center py-10">
                <Image
                  className="border rounded-xl"
                  src={Cat}
                  alt=""
                  width={300}
                  height={300}
                />
              </div> */}
            </div>
            <div className="flex flex-col gap-2">
              {/* <Select
                placeholder="Select a category"
                options={[
                  { value: "animals", label: <span>Animals</span> },
                  { value: "plants", label: <span>Plants</span> },
                  { value: "vehicles", label: <span>Vehicles</span> },
                ]}
              /> */}
              {/* <Upload {...props} multiple={false}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload> */}

              <UploadImage />
              {/* <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button> */}

              {/* <div className="">
                <p>Predictions</p>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
              </div> */}
            </div>
          </div>
        </>
      </ModalCommon>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-34-34 font-semibold">Model List</p>
        </div>

        <TableCommon
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={modelList}
          rowKey={(record) => record.name}
          footer={() => (
            <div className="justify-center my-2 ">
              <button
                onClick={() => setModalOpen(true)}
                className="btn w-full bg-primary border-none hover:bg-primary-hover"
              >
                {/* <PlusOutlined style={{ fontSize: "18px", color: "white" }} /> */}
                <span className="font-bold uppercase text-white ">
                  Create a new model
                </span>
              </button>
            </div>
          )}
        />
      </div>
    </>
  );
}
