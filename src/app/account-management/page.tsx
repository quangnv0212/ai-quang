"use client";
import { useAppContext } from "@/app-provider";
import { PermissionDenied } from "@/components/permission-denied";
import TableUser from "@/components/table-user";
import { useEffect, useState } from "react";
export default function UserManagementPage() {
  const context = useAppContext();
  const checkPermission = context.user?.permissions?.includes("Pages.Users");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {!isClient || !checkPermission ? <PermissionDenied /> : <TableUser />}
    </div>
  );
}
