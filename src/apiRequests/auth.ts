import http from "@/lib/http";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import axios from "axios";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post(
      "https://nobisofht.aibase.nobisoft.vn/api/TokenAuth/Authenticate",
      body
    ),

  auth: (body: {
    accessToken: string;
    expireInSeconds: string;
    encryptedAccessToken: string;
  }) => axios.post("/api/auth", body),
  register: (body: RegisterBodyType) =>
    http.post("https://aibase.nobisoft.vn/api/TokenAuth/Register", body),
  logoutFromNextClientToNextServer: () => http.post("/api/auth/logout"),
};

export default authApiRequest;
