import http from "@/lib/http";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import axios from "axios";

const authApiRequest = {
  login: (body: LoginBodyType, tenant?: string, tenantId?:number) => {
    if (tenant) {
      return axios.post(
        `https://aibase.nobisoft.vn/api/v1.0/TokenAuth/Authenticate`,
        body,
        {
          headers: {
            "Abp.TenantId": 1
          }
        }

        
      );
    } else {
      return axios.post(
        `https://aibase.nobisoft.vn/api/v1.0/TokenAuth/Authenticate`,
        body
      );
    }
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
  isTenantAvailable:(body:{tenancyName:string}) => http.post("/services/app/Account/IsTenantAvailable",body)
};

export default authApiRequest;
