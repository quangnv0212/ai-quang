import http from "@/lib/http";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import axios from "axios";

const authApiRequest = {
  login: (body: LoginBodyType, tenant: string) =>
    // http.post(`/TokenAuth/Authenticate`, body),
    axios.post(
      `https://Nobisofht.aibase.nobisoft.vn/api/TokenAuth/Authenticate`,
      body
    ),

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
};

export default authApiRequest;
