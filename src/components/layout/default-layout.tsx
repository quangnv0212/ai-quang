import TopBar from "./Topbar";
import Sidebar from "./Sidebar";
import { sidebarLinksAdmin } from "@/constants/general.const";
import { CurrentUser } from "@/app/layout";
import { getRole } from "@/lib/utils";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
  user: CurrentUser | null;
}

export function DefaultLayout(props: IDefaultLayoutProps) {
  const { children, user } = props;
  let sidebarLinks: any[] = [];
  if (
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
    "Admin"
  ) {
    sidebarLinks = sidebarLinksAdmin;
  }
  return (
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
  );
}
