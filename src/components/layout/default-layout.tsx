"use client";
import AppProvider from "@/app-provider";
import { CurrentUser } from "@/app/layout";
import { sidebarLinksAdmin } from "@/constants/general.const";
import { decodeJWT } from "@/lib/utils";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
  accessToken: any;
}

export function DefaultLayout(props: IDefaultLayoutProps) {
  const { children, accessToken } = props;
  const queryClient = new QueryClient();
  let sidebarLinks: any[] = sidebarLinksAdmin;
  const [user, setUser] = useState<CurrentUser | null>(null);
  useEffect(() => {
    if (!accessToken) {
      setUser(null);
    } else {
      setUser(decodeJWT(accessToken.value));
    }
  }, [accessToken]);
  if (
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
    "Admin"
  ) {
    sidebarLinks = sidebarLinksAdmin;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <AppProvider user={user} inititalSessionToken={accessToken?.value}>
          <ToastContainer />
          <div>
            {user ? (
              <>
                <TopBar />
                <div className="grid grid-cols-[250px_minmax(0,1fr)] min-h-screen">
                  <Sidebar sidebarLinks={sidebarLinks} />
                  <div className="px-6 py-7">{children}</div>
                </div>
              </>
            ) : (
              <>{children}</>
            )}
          </div>
        </AppProvider>
      </AntdRegistry>
    </QueryClientProvider>
  );
}
