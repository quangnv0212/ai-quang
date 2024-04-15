import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import axios, { AxiosResponse } from "axios";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post(
      "https://Nobisofht.aibase.nobisoft.vn/api/TokenAuth/Authenticate",
      body
    ),
  auth: (body: {
    accessToken: string;
    expireInSeconds: string;
    encryptedAccessToken: string;
  }) => axios.post("/api/auth", body),
  register: (body: RegisterBodyType) =>
    http.post(
      "https://Nobisofht.aibase.nobisoft.vn/api/TokenAuth/Register",
      body
    ),
};

export default authApiRequest;
