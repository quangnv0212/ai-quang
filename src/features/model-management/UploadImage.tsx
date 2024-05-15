"use client";
import { Button, Image, TableColumnsType } from "antd";
import { useRef, useState } from "react";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import axios from "axios";
import ThunderboltOutlined from "@ant-design/icons/ThunderboltOutlined";
import { ButtonCommon } from "@/components/common/button-common";
import { TableCommon } from "@/components/common/table-common";
import { AccountBodyType } from "@/schemaValidations/account.schema";
import { toast } from "react-toastify";
export interface IUploadImageProps {}

export function UploadImage(props: IUploadImageProps) {
  const [file, setFile] = useState<any>();
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handlePredict = () => {
    setLoading(true);
    let data = new FormData();
    data.append("project_id", "d5b57441-c2b8-4bfe-a3dc-beb029c93857");
    data.append("iteration_id", "classify");
    data.append("image", file);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://aibase.nobisoft.vn/api/v1.0/services/app/User/Predict",
      headers: {
        accept: "*/*",
        "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc3BuZXRib2lsZXJwbGF0ZS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjFlNzkwNmMxLTk4ODAtY2NlYS0yMDVjLTNhMTI2ZTVhMzE0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6IjJhNjcwOGI2LTFhMGYtNGMxNS1iZTUwLTViMDZhZTU1MDNlMiIsImlhdCI6MTcxNTczOTQ3OCwicGVybWlzc2lvbnMiOlsiUGFnZXMuVXNlcnMiLCJQYWdlcy5Vc2Vycy5BY3RpdmF0aW9uIiwiUGFnZXMuUm9sZXMiLCJQYWdlcy5UZW5hbnRzIl0sIm5iZiI6MTcxNTczOTQ3OCwiZXhwIjoxNzE1ODI1ODc4LCJpc3MiOiJhaWJhc2UiLCJhdWQiOiJhaWJhc2UifQ.DYgcByCRf-euqcTAogRtbZbEowXzAGNsVbAZBSLsaQM",
        cookie:
          "__stripe_mid=1d20f88f-8ef0-483c-a246-501c706a0a2157abd7; .AspNetCore.Antiforgery.L-DUBmSK_Jo=CfDJ8AMPT0xpUGVBibB6FYN2qHildqfnnKua21BQdWV_9Yh7cnyMthB5Mq8Hppgi_gAeTYy5YXxsAUqwKB785IlSc15_vFNJr0iSx2ePfsJmh47Av_Su0toy-IbDptIpkhAfBkNx1wutIB49_2YAeVwTL28; Abp.AuthToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc3BuZXRib2lsZXJwbGF0ZS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjFlNzkwNmMxLTk4ODAtY2NlYS0yMDVjLTNhMTI2ZTVhMzE0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6IjJhNjcwOGI2LTFhMGYtNGMxNS1iZTUwLTViMDZhZTU1MDNlMiIsImlhdCI6MTcxNTczOTQ3OCwicGVybWlzc2lvbnMiOlsiUGFnZXMuVXNlcnMiLCJQYWdlcy5Vc2Vycy5BY3RpdmF0aW9uIiwiUGFnZXMuUm9sZXMiLCJQYWdlcy5UZW5hbnRzIl0sIm5iZiI6MTcxNTczOTQ3OCwiZXhwIjoxNzE1ODI1ODc4LCJpc3MiOiJhaWJhc2UiLCJhdWQiOiJhaWJhc2UifQ.DYgcByCRf-euqcTAogRtbZbEowXzAGNsVbAZBSLsaQM; accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc3BuZXRib2lsZXJwbGF0ZS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IkFFV1BSQjYzTEtYUkY1TlZCUUJaT0M1SEdBSjJINUtUIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJzdWIiOiIxIiwianRpIjoiOTdjM2E4NzMtY2ZjMy00OTgwLWFiZTEtYzk4ZjMwOTc5ZDgwIiwiaWF0IjoxNzE1NzU2NzkzLCJwZXJtaXNzaW9ucyI6WyJQYWdlcy5Vc2VycyIsIlBhZ2VzLlVzZXJzLkFjdGl2YXRpb24iLCJQYWdlcy5Sb2xlcyIsIlBhZ2VzLlRlbmFudHMiXSwibmJmIjoxNzE1NzU2NzkzLCJleHAiOjE3MTU4NDMxOTMsImlzcyI6ImFpYmFzZSIsImF1ZCI6ImFpYmFzZSJ9.ZEoYrEdPBFDhikxM5s0WARQYfGCxtEvu6eU1adZjRno; XSRF-TOKEN=CfDJ8AMPT0xpUGVBibB6FYN2qHg0p78mNoVTCUVRjkZm8Cu5e5RSX0oQ7QveRthYAAMiqcj8Hj-r-N59ax3OBfIPhCbrWruKHyWQ_lnotkJhdfXwLMwtMfeqOrjXUk3wcQ-d0Z3Q3qEy_DMog6JaEl5O61MlCv9OKq9EsQy8MywT5V8IWk0pA9yZRaUW_cmRrMEBRw",
        origin: "https://localhost:44311",
        priority: "u=1, i",
        referer: "https://localhost:44311/swagger/index.html",
        "sec-ch-ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "x-xsrf-token":
          "CfDJ8AMPT0xpUGVBibB6FYN2qHg0p78mNoVTCUVRjkZm8Cu5e5RSX0oQ7QveRthYAAMiqcj8Hj-r-N59ax3OBfIPhCbrWruKHyWQ_lnotkJhdfXwLMwtMfeqOrjXUk3wcQ-d0Z3Q3qEy_DMog6JaEl5O61MlCv9OKq9EsQy8MywT5V8IWk0pA9yZRaUW_cmRrMEBRw",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        setDataList(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Error");
      });
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
      <div className="flex flex-col gap-1">
        <ButtonCommon
          className="btn btn-sm bg-primary text-white hover:bg-primary"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <UploadOutlined />
          Upload File
        </ButtonCommon>
        <p>File formats accepted: jpg, png, bmp</p>
        <p>File size should not exceed: 4mb</p>
      </div>

      {file && (
        <>
          <div className="flex justify-between gap-3 items-center">
            <Image
              src={URL.createObjectURL(file)}
              alt=""
              width={300}
              height={300}
              className="rounded-xl w-full h-full"
            />
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
      )}
    </div>
  );
}
