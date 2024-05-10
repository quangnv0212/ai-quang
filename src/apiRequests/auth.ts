import http from "@/lib/http";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import axios from "axios";

const authApiRequest = {
  login: (body: LoginBodyType, tenantId?: number) => {
    return axios.post(
      `https://aibase.nobisoft.vn/api/v1.0/TokenAuth/Authenticate`,
      body,
      tenantId ? {
        headers: {
          "Abp.TenantId": tenantId
        }
      } : undefined
    );
  },
  auth: (body: {
    accessToken: string;
    expireInSeconds: string;
    encryptedAccessToken: string;
  }) => axios.post("/api/auth", body),
  register: (body: RegisterBodyType) =>
    http.post("/services/app/Account/Register", body),
  activateByEmail: (body: { email: string; token: string }) =>
    http.post("/services/app/Account/ActivateByEmail", body),
  logoutFromNextClientToNextServer: () => axios.post("/api/auth/logout"),
  getTenantIdByUserName:(params:{userName:string}) => http.get("/services/app/Account/getTenantIdByUserName", {
    params,
  }),
};

export default authApiRequest;
