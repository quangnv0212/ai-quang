"use client";
import { useGetListModel } from "@/apiRequests/hooks/model/useGetListModel";
import { ButtonCommon } from "@/components/common/button-common";
import { ModalCommon } from "@/components/common/modal-common";
import { TableCommon } from "@/components/common/table-common";
import {
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  BulbOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import type { GetProp, TableColumnsType, UploadFile, UploadProps } from "antd";
import { Button, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { UploadImage } from "./UploadImage";
import { InputTextCommon } from "@/components/common/input-text";
import { Form } from "antd";
import { ModelBody, ModelBodyType } from "@/schemaValidations/model.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateModel } from "@/apiRequests/hooks/model/useCreateModel.hook";
import { toast } from "react-toastify";
import { useUploadImageModel } from "@/apiRequests/hooks/model/useUploadImageModel.hook";
import { useCheckStatusModel } from "@/apiRequests/hooks/model/useCheckStatusModel";
import modelApiRequest from "@/apiRequests/model";
import { IconSearch } from "@/components/icons";
import { useSearchParams } from "next/navigation";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function ModalModel() {
  const [mode, setMode] = useState("Tagged");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [modelList, setModelList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusModel, setStatusModel] = useState("");
  const [requestGetListModel] = useGetListModel();
  const [requestCreateModel] = useCreateModel();
  const [requestUploadImageModel] = useUploadImageModel();
  const [requestCheckStatusModel] = useCheckStatusModel();
  const [modelId, setModelId] = useState();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchListModel();
    checkStatusTraningModel();
  }, []);

  useEffect(() => {
    if (statusModel === "Unpushish") {
      pushlishProject();
    }
  }, [statusModel]);

  const pushlishProject = async () => {
    await modelApiRequest.pushlishProject();
  };

  const fetchListModel = () => {
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

  const checkStatusTraningModel = () => {
    requestCheckStatusModel(
      setLoading,
      (res: any) => {
        setStatusModel(res.result);
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

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
            <ButtonCommon
              onClick={() => {
                // setIsShowImageModel(true);
                // setModalOpen(true);
              }}
            >
              <EyeOutlined
                style={{
                  fontSize: 16,
                }}
              />
            </ButtonCommon>
            <ButtonCommon
              onClick={() => {
                // setModalOpen(true);
                setModelId(record?.id);
                //set Selected row
                // inputRef.current?.click();
              }}
            >
              <EditOutlined
                style={{
                  fontSize: 16,
                }}
              />
            </ButtonCommon>
            <ButtonCommon
              onClick={() => {
                // setModalOpen(true);
                setModelId(record?.id);
                //set Selected row
                // inputRef.current?.click();
              }}
            >
              <DeleteOutlined
                style={{
                  fontSize: 16,
                }}
              />
            </ButtonCommon>
            <ButtonCommon
              onClick={() => {
                // setModalOpen(true);
                setModelId(record?.id);
                //set Selected row
                inputRef.current?.click();
              }}
            >
              <UploadOutlined
                style={{
                  fontSize: 16,
                }}
              />
            </ButtonCommon>
          </div>
        );
      },
    },
  ];

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

  const handleTraning = () => {
    modelApiRequest.useTrainingModel();
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenCreateModel, setModalOpenCreateModel] = useState(false);

  const handleCancel = () => {
    setModalOpen(false);
  };
  const handleCancelCreateModel = () => {
    setModalOpenCreateModel(false);
  };

  const { control, handleSubmit } = useForm<ModelBodyType>({
    resolver: zodResolver(ModelBody),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: ModelBodyType) => {
    requestCreateModel(
      {
        ...values,
      },
      setLoading,
      () => {
        handleCancelCreateModel();
        toast.success("Create model successfully");
        fetchListModel();
      },
      () => {}
    );
  };
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState<string | undefined>(
    searchParams.get("Keyword")?.toString()
  );
  const buttons = [
    {
      title: "Tagged",
      onclick: () => {
        setMode("Tagged");
      },
    },
    {
      title: "Untagged",
      onclick: () => {
        setMode("Untagged");
      },
    },
  ];
  const [isShowImageModel, setIsShowImageModel] = useState(false);
  return (
    <>
      <ModalCommon
        open={isShowImageModel}
        centered
        padding={0}
        footer={null}
        onCancel={() => {
          setIsShowImageModel(false);
        }}
        style={{ borderRadius: 8 }}
        width={600}
        closable={false}
      >
        f
      </ModalCommon>
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
            </div>
            <div className="flex flex-col gap-2">
              <UploadImage />
            </div>
          </div>
        </>
      </ModalCommon>

      <ModalCommon
        open={modalOpenCreateModel}
        centered
        padding={0}
        footer={null}
        onCancel={handleCancelCreateModel}
        style={{ borderRadius: 8 }}
        width={600}
        closable={false}
      >
        <div className="px-6 flex flex-col gap-4">
          <p className="font-bold text-24-28 capitalize text-center font-visby">
            Create a new model
          </p>
          <Form
            onFinish={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputTextCommon
              label="Name"
              name="name"
              placeholder="Enter your model name"
              control={control}
            />

            <div className="flex flex-col gap-3 mt-3">
              <ButtonCommon
                loading={loading}
                type="submit"
                className="btn btn-sm w-full hover:bg-primary-hover bg-primary text-white border-none"
              >
                Create model
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
      </ModalCommon>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-34-34 font-semibold">Model List</div>

          <div className="flex gap-3">
            <Button
              loading={statusModel === "Training"}
              onClick={handleTraning}
              icon={<BulbOutlined />}
            >
              Training
            </Button>
            <Button
              icon={<FieldTimeOutlined />}
              onClick={() => setModalOpen(true)}
            >
              Quick Test
            </Button>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="px-5 rounded-lg flex items-center gap-2 h-[38px] w-[400px] bg-white border">
            <IconSearch />
            <input
              type="text"
              placeholder="Search"
              className="w-full font-normal  outline-none text-primary placeholder:text-gray80"
              onChange={(e) => {
                // handleSearch(e.target.value);
              }}
              value={keyword}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {buttons.map((button, index) => {
                let className: string = "";
                const isActiveSearchParam = searchParams.get("isActive");
                if (isActiveSearchParam === null && button.title === "All") {
                  className = "btn-primary btn-active";
                }
                if (mode === button.title) {
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
            <p className="uppercase text-xs">Showing: all {mode} images</p>
          </div>
        </div>

        <TableCommon
          // rowSelection={{
          //   type: "radio",
          //   ...rowSelection,
          // }}
          columns={columns}
          dataSource={modelList}
          rowKey={(record) => record.id}
          footer={() => (
            <div className="justify-center my-2 ">
              <button
                onClick={() => setModalOpenCreateModel(true)}
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

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const data: any = new FormData();
            data.append("ModelId", modelId);
            data.append("Images", e.target.files[0]);

            requestUploadImageModel(
              data,
              setLoading,
              () => {
                toast.success("Upload image successfully");
                fetchListModel();
              },
              () => {}
            );
          }
        }}
        className="hidden"
        ref={inputRef}
      />
    </>
  );
}
