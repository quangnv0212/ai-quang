import http from "@/lib/http";
import { AccountBodyType } from "@/schemaValidations/account.schema";
import axios from "axios";

const userApiRequest = {
  createUser: (body: AccountBodyType) => {
    return http.post(`/services/app/User/Create`, {
      ...body,
      roleNames: [],
      isActive: body.isActive === true ? true : false,
    });
  },
  getListUser: (params: {
    keyword?: string;
    isActive: boolean;
    SkipCount: number;
    MaxResultCount: number;
  }) => http.get(`/services/app/User/GetAll`, { params }),
  updateUser: (body: AccountBodyType) =>
    http.put(`/services/app/User/Update`, body),
  deleteUser: (id: string) =>
    http.delete(`/services/app/User/Delete`, { params: { id } }),
};

export default userApiRequest;
