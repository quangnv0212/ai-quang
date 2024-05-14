"use client";
import Cat from "@/assets/images/cat.png";
import { TableCommon } from "@/components/common/table-common";
import { convertFileToArrayBuffer } from "@/lib/convert-file-to-arraybuffer";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import type { GetProp, TableColumnsType, UploadFile, UploadProps } from "antd";
import { Button, Select, Table, Tabs, Upload, message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
const { Column, ColumnGroup } = Table;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function ModalModel() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [modelList, setModelList] = useState<any[]>([]);
  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "lastModified",
      render(value, record, index) {
        if (!record?.properties?.lastModified) return <></>;
        let date = new Date(record?.properties?.lastModified);
        let output = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).format(date);
        return output;
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(selectedRowKeys);
    },
  };

  useEffect(() => {
    getList();
  }, []);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as FileType);
    });
    setUploading(true);
    convertFileToArrayBuffer(fileList[0] as any)
      .then((fileArrayBuffer) => {
        if (!fileArrayBuffer) {
          return;
        }

        const blockBlobClient = new BlockBlobClient(
          `https://aibasedemo.blob.core.windows.net/images/${fileList[0]?.name}?sp=racwdli&st=2024-05-01T10:11:51Z&se=2024-06-06T18:11:51Z&spr=https&sv=2022-11-02&sr=c&sig=e3UVoLRl1Y6SdOkGPvM8%2BxzLpyrPS0ZwaksVNfdySvA%3D`
        );
        return blockBlobClient.uploadData(fileArrayBuffer, {
          blobHTTPHeaders: { blobContentType: "text/plain" },
        });
      })
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

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
  const dataSource = [
    {
      key: "1",
      tag: "dog",
      probability: 0.9,
    },
    {
      key: "2",
      tag: "cat",
      probability: 0.8,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  const getList = async () => {
    const blobServiceClient = new BlobServiceClient(
      `https://aibasedemo.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupiytfx&se=2025-03-12T00:41:10Z&st=2024-05-13T16:41:10Z&spr=https&sig=I8CyYVd19xG7a3r6cI84EzC1hdJcLDAKBTAs686%2BI60%3D`
    );

    const containerName = "images";

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobs = containerClient.listBlobsFlat();

    const list = [];
    for await (const blob of blobs) {
      list.push(blob);
    }

    setModelList(list);
  };

  const handleTraning = () => {
    // call api training
  };

  const checkStatusTraningModel = () => {
    // call api check status tranning model
  };
  console.log(modelList);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Training Model",
            children: (
              <div className="flex gap-4">
                <div>
                  <Button onClick={handleTraning}>Traning</Button>
                </div>
                <div>
                  <TableCommon
                    rowSelection={{
                      type: "radio",
                      ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={modelList}
                    rowKey={(record) => record.name}
                  />
                </div>
              </div>
            ),
          },
          {
            key: "2",
            label: "Predict Model",
            children: (
              <>
                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    <p className="pb-5 text-2xl font-semibold">Quick test</p>
                    <div className="bg-gray-300 flex items-center justify-center py-10">
                      <Image
                        className="border rounded-xl"
                        src={Cat}
                        alt=""
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Select
                      placeholder="Select a category"
                      options={[
                        { value: "animals", label: <span>Animals</span> },
                        { value: "plants", label: <span>Plants</span> },
                        { value: "vehicles", label: <span>Vehicles</span> },
                      ]}
                    />
                    <Upload {...props} multiple={false}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Button
                      type="primary"
                      onClick={handleUpload}
                      disabled={fileList.length === 0}
                      loading={uploading}
                      style={{ marginTop: 16 }}
                    >
                      {uploading ? "Uploading" : "Start Upload"}
                    </Button>
                    <Button>Training</Button>
                    <div className="">
                      <p>Predictions</p>
                      <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                      />
                    </div>
                  </div>
                </div>
              </>
            ),
          },
        ]}
        onChange={onChange}
      />
    </>
  );
}
