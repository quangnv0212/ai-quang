import * as React from "react";
import TopBar from "./Topbar";
import Sidebar from "./Sidebar";
import { sidebarLinksAdmin } from "@/constants/general.const";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
  user: any;
}

export function DefaultLayout(props: IDefaultLayoutProps) {
  const { children, user } = props;
  let sidebarLinks = [];
  if (user?.role === "admin") {
    sidebarLinks = sidebarLinksAdmin;
  }

  return (
    <div>
      {user ? (
        <>
          <TopBar />
          <div className="grid grid-cols-[250px_minmax(0,1fr)] min-h-screen">
            <Sidebar sidebarLinks={sidebarLinksAdmin} />
            <div className="px-6 py-7">{children}</div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
