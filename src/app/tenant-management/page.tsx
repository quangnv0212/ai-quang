"use client";
import { useAppContext } from "@/app-provider";
import { ManageRoles } from "@/components/manage-roles";
import { PermissionDenied } from "@/components/permission-denied";
import { useEffect, useState } from "react";

export default function TenantManagementPage() {
  const context = useAppContext();
  const checkPermission = context.user?.permissions.includes("Pages.Tenants");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {!isClient || !checkPermission ? <PermissionDenied /> : <ManageRoles />}
    </div>
  );
}
