"use client";
import AppProvider from "@/app-provider";
import { CurrentUser } from "@/app/layout";
import { decodeJWT } from "@/lib/utils";
import {
  BankOutlined,
  CheckCircleOutlined,
  ControlOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import TopBar from "./Topbar";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
  accessToken: any;
}
const { Content, Sider } = Layout;

export function DefaultLayout(props: IDefaultLayoutProps) {
  const { children, accessToken } = props;
  const queryClient = new QueryClient();
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState<CurrentUser | null>(null);
  useEffect(() => {
    if (!accessToken) {
      setUser(null);
    } else {
      setUser(decodeJWT(accessToken.value));
    }
  }, [accessToken]);

  const [collapsed, setCollapsed] = useState(false);
  const items: any[] = [
    {
      key: "/tenant-management",
      icon: <BankOutlined width={20} height={20} />,
      label: "Tenant",
      onClick: () => {
        router.push("/tenant-management");
      },
    },
    {
      key: "/account-management",
      icon: <UserOutlined />,
      label: "User",
      onClick: () => {
        router.push("/account-management");
      },
    },
    {
      key: "/roles-management",
      icon: <ControlOutlined />,
      label: "Role",
      onClick: () => {
        router.push("/roles-management");
      },
    },
    {
      key: "/user-activation",
      icon: <CheckCircleOutlined />,
      label: "User Activation",
      onClick: () => {
        router.push("/user-activation");
      },
    },
  ];
  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <AppProvider user={user} inititalSessionToken={accessToken?.value}>
          <ToastContainer />
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              width={240}
              theme="light"
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div className="demo-logo-vertical" />
              <div className="h-40 flex items-center justify-center">
                AiBase
              </div>

              <Menu
                theme="light"
                defaultSelectedKeys={[pathName]}
                mode="inline"
                items={items}
              />
            </Sider>
            <Layout>
              <TopBar />
              <Content style={{ margin: "24px" }}>{children}</Content>
            </Layout>
          </Layout>
        </AppProvider>
      </AntdRegistry>
    </QueryClientProvider>
  );
}
