import http from "@/lib/http";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import axios from "axios";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    axios.post(
      "https://nobisofht.aibase.nobisoft.vn/api/TokenAuth/Authenticate",
      body
    ),
  // login: (body: LoginBodyType) =>
  //   http.post("https://lms-api-test.myzenithstudy.com/v1/auth/login", {
  //     email: "nva030801@gmail.com",
  //     password: "Abc@123456",
  //   }),
  auth: (body: {
    accessToken: string;
    expireInSeconds: string;
    encryptedAccessToken: string;
  }) => axios.post("/api/auth", body),
  register: (body: RegisterBodyType) =>
    http.post("https://aibase.nobisoft.vn/api/TokenAuth/Register", body),
};

export default authApiRequest;
