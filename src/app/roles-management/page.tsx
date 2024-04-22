"use client";
import { useAppContext } from "@/app-provider";
import { ManageRoles } from "@/components/manage-roles";
import { PermissionDenied } from "@/components/permission-denied";
import { useState, useEffect } from "react";

export default function RoleManagementPage() {
  const context = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkPermission = context.user?.permissions.includes("Pages.Roles");

  return (
    <div>
      {!isClient || !checkPermission ? <PermissionDenied /> : <ManageRoles />}
    </div>
  );
}
