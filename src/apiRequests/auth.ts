import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import axios, { AxiosResponse } from "axios";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    axios.post(
      "https://Nobisofht.aibase.nobisoft.vn/api/TokenAuth/Authenticate",
      body
    ),
  auth: (body: {
    accessToken: string;
    expireInSeconds: string;
    encryptedAccessToken: string;
  }) => axios.post("/api/auth", body),
  register: (body: RegisterBodyType) =>
    axios.post(
      "https://Nobisofht.aibase.nobisoft.vn/api/TokenAuth/Register",
      body
    ),
};

export default authApiRequest;
