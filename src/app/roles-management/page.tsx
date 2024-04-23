"use client";
import { useAppContext } from "@/app-provider";
import { ManageRoles } from "@/components/manage-roles";
import { PermissionDenied } from "@/components/permission-denied";
import { useState, useEffect } from "react";

export default function RoleManagementPage() {
  return (
    <div>
      <ManageRoles />
    </div>
  );
}
