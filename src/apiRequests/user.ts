import http from "@/lib/http";
import { UserBodyType } from "@/schemaValidations/user.schema";
import axios from "axios";

const userApiRequest = {
  createUser: (body: UserBodyType) => {
    return http.post(`/services/app/User/Create`, {
      ...body,
      roleNames: [],
    });
  },
  getListUser: (params: {
    keyword?: string;
    isActive: boolean;
    SkipCount: number;
    MaxResultCount: number;
  }) => http.get(`/services/app/User/GetAll`, { params }),
  updateUser: (body: UserBodyType) =>
    http.put(`/services/app/User/Update`, body),
  deleteUser: (id: string) =>
    http.delete(`/services/app/User/Delete`, { params: { id } }),
};

export default userApiRequest;
