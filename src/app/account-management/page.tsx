import TableTAccount from "@/features/account-management/table-account";
import { decodeJWT } from "@/lib/utils";
import { cookies } from "next/headers";

export default function UserManagementPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")!;
  const user = decodeJWT(accessToken.value);
  const userRole =
    user &&
    user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  return <TableTAccount role={userRole} />;
}
