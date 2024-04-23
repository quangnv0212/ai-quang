"use client";
import { useAppContext } from "@/app-provider";
import { ManageTenant } from "@/components/manage-tenant";
import { PermissionDenied } from "@/components/permission-denied";
import { useEffect, useState } from "react";

export default function TenantManagementPage() {
  return (
    <div>
      <ManageTenant />
    </div>
  );
}
