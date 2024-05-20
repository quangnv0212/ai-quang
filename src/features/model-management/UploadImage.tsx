"use client";
import { Button, Image, TableColumnsType } from "antd";
import { useRef, useState } from "react";
import CloudUploadOutlined from "@ant-design/icons/CloudUploadOutlined";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import IcUpload from "@/assets/images/ic_uploadCloud.png";
import axios from "axios";
import ThunderboltOutlined from "@ant-design/icons/ThunderboltOutlined";
import { ButtonCommon } from "@/components/common/button-common";
import { TableCommon } from "@/components/common/table-common";
import { AccountBodyType } from "@/schemaValidations/account.schema";
import { toast } from "react-toastify";
import { usePredictImage } from "@/apiRequests/hooks/model/usePredictImage.hook";
export interface IUploadImageProps {}

export function UploadImage(props: IUploadImageProps) {
  const [file, setFile] = useState<any>();
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [requestPredictImage] = usePredictImage();

  const handlePredict = () => {
    let data = new FormData();
    data.append("image", file);

    requestPredictImage(
      data,
      setLoading,
      (response: any) => {
        setLoading(false);
        setDataList(response.result);
      },
      () => {}
    );
  };
  const columns: TableColumnsType<AccountBodyType> = [
    {
      title: "Tag name",
      dataIndex: "tagName",
      key: "tagName",
    },
    {
      title: "Probability",
      dataIndex: "probability",
      key: "probability",
      render(value, record, index) {
        return `${(value * 100).toFixed(2)}%`;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setDataList([]);
          }
        }}
        className="hidden"
        ref={inputRef}
      />
      <ButtonCommon
        className="btn btn-sm hidden bg-primary text-white hover:bg-primary"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <UploadOutlined />
        Upload File
      </ButtonCommon>

      <>
        <div className="flex justify-between gap-3 items-center">
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              alt=""
              width={300}
              height={300}
              className="rounded-xl w-full h-full"
            />
          ) : (
            <div
              onClick={() => {
                inputRef.current?.click();
              }}
              onDrag={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                console.log(files);
              }}
              className="w-[300px] cursor-pointer border-black h-[300px] rounded-xl border-dashed border-2 flex gap-4 items-center justify-center flex-col"
            >
              <p className="text-xl font-semibold uppercase">Upload an image</p>
              <img src={IcUpload.src} alt="" className="w-20 h-20" />
              <p className="text-center font-semibold">
                Drag and drop files here, or browse your computer{" "}
              </p>
              <div className="text-xs">
                <p>File formats accepted: jpg, png, bmp</p>
                <p>File size should not exceed: 4mb</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Predictions</p>
            <TableCommon
              pagination={false}
              dataSource={dataList}
              columns={columns}
            />
            <Button
              loading={loading}
              className="btn btn-sm bg-primary text-white hover:bg-primary"
              onClick={handlePredict}
              disabled={Boolean(dataList.length)}
            >
              <ThunderboltOutlined />
              Predict
            </Button>
          </div>
        </div>
      </>
    </div>
  );
}
