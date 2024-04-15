import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import axios from "axios";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    axios.post<LoginResType>(
      "https://Nobisofht.aibase.nobisoft.vn/api/TokenAuth/Authenticate",
      body
    ),
  register: (body: RegisterBodyType) =>
    axios.post(
      "https://Nobisofht.aibase.nobisoft.vn/api/TokenAuth/Register",
      body
    ),
};

export default authApiRequest;
