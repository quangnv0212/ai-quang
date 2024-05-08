import { cookies } from "next/headers";

export default async function CompanyManagementPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    "https://aibase.nobisoft.vn/api/v1.0/services/app/Tenant/GetAll",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = res.json();
  console.log(data);

  return <>2</>;
}
