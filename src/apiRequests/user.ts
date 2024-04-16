import { UserBodyType } from "@/schemaValidations/user.schema";
import axios from "axios";

const userApiRequest = {
  createUser: (body: UserBodyType) => {
    return axios.post(
      `https://aibase.nobisoft.vn/api/services/app/User/Create`,
      {
        ...body,
        roleNames: body.roleNames.length ? body.roleNames : [],
      }
    );
  },
};

export default userApiRequest;
